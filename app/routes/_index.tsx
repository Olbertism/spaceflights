import { Link } from '@remix-run/react';
import type { MetaFunction } from '@vercel/remix';
import { useCallback, useEffect, useState } from 'react';
import { css } from 'styled-system/css';
import { container, flex } from 'styled-system/patterns';
import { ArticleGrid } from '~/components/ArticleGrid';
import { Pagination } from '~/components/Pagination';
import { SearchBar } from '~/components/SearchBar';
import { SortButtons } from '~/components/SortButtons';
import type { PaginatedArticleList } from '~/types/api';

export const meta: MetaFunction = () => {
  return [
    { title: 'Spaceflights' },
    { name: 'description', content: 'Aktuelle Weltraumflüge in Ihrem Bezirk!' },
  ];
};

export default function Index() {
  const [apiArticles, setApiArticles] = useState<PaginatedArticleList>({
    count: 0,
    next: '',
    previous: '',
    results: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasApiError, setHasApiError] = useState(false);

  const [sortByPublishedAt, setSortByPublishedAt] = useState<
    'asc' | 'desc' | null
  >(null);

  const [sortByTitle, setSortByTitle] = useState<'asc' | 'desc' | null>(null);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = useCallback(async (url: string) => {
    setIsLoading(true);
    const response = await fetch(url);
    if (!response.ok) {
      const articles = await response.json();
      setApiArticles(articles);
      setTotalPages(Math.ceil(articles.count / 10));
    } else {
      setHasApiError(true);
    }
    setIsLoading(false);
  }, []);

  // initial fetch
  useEffect(() => {
    fetchData('https://api.spaceflightnewsapi.net/v4/articles/');
  }, [fetchData]);

  const onSearch = useCallback(
    (searchTerm: string) => {
      setSortByPublishedAt(null);
      setSortByTitle(null);
      fetchData(
        `https://api.spaceflightnewsapi.net/v4/articles/${searchTerm && '?title_contains=' + searchTerm}`,
      );
    },
    [fetchData],
  );

  const onSortByPublishedAt = useCallback(
    (sortDir: 'asc' | 'desc') => {
      setSortByTitle(null);
      setSortByPublishedAt(sortDir);
      fetchData(
        `https://api.spaceflightnewsapi.net/v4/articles/${sortDir === 'asc' ? '?ordering=published_at' : '?ordering=-published_at'}`,
      );
    },
    [fetchData],
  );

  const onSortByTitle = useCallback(
    (sortDir: 'asc' | 'desc') => {
      setSortByPublishedAt(null);
      setSortByTitle(sortDir);
      /* Spaceflights API does not seem to offer a BE sorting on the title. Therefore a simple front end
      sorting on the current fetched data set is done */
      const sortedResults = apiArticles.results.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (titleA < titleB) {
          return sortDir === 'asc' ? -1 : 1;
        }
        if (titleA > titleB) {
          return sortDir === 'asc' ? 1 : -1;
        }
        return 0;
      });
      const updatedState = { ...apiArticles, results: sortedResults };
      setApiArticles(updatedState);
    },
    [apiArticles],
  );

  const onPageChange = useCallback(
    (pageNumber: number) => {
      if (pageNumber < currentPage) {
        apiArticles && apiArticles.previous && fetchData(apiArticles.previous);
      } else {
        apiArticles && apiArticles.next && fetchData(apiArticles.next);
      }
      setCurrentPage(pageNumber);
    },
    [currentPage, apiArticles, fetchData],
  );

  return (
    <main
      className={css({
        display: 'flex',
        flexDir: 'column',
        padding: '4',
        gap: '2',
      })}
    >
      <div
        className={css({
          width: '100%',
          display: 'flex',
          flexDir: 'column',
          gap: '2',
          justifyContent: 'space-between',
          md: { flexDir: 'row' },
        })}
      >
        <Link to={'/'}>
          <div className={flex()}>
            <h1
              className={css({
                fontSize: '3xl',
                fontWeight: 'bold',
                margin: 'auto',
              })}
            >
              Spaceflights News
            </h1>
          </div>
        </Link>

        <div
          className={css({
            display: 'flex',
            flexDir: 'column',
            gap: '3',
            md: { flexDir: 'row' },
          })}
        >
          <SearchBar onSearch={onSearch} />
          <SortButtons
            onSortByTitle={onSortByTitle}
            onSortByPublishedAt={onSortByPublishedAt}
            sortByPublishedAt={sortByPublishedAt}
            sortByTitle={sortByTitle}
          />
        </div>
      </div>

      {isLoading ? (
        <div className={container({ height: '1/3' })}>
          <div className={css({ fontSize: 'xl' })}>Loading...</div>
        </div>
      ) : hasApiError ? (
        <div className={container({ height: '1/3' })}>
          <div className={css({ fontSize: 'xl' })}>
            Unable to fetch data. Please try again later.
          </div>
        </div>
      ) : (
        <>
          <ArticleGrid apiArticles={apiArticles} />
          <div
            className={css({
              display: 'flex',
              justifyContent: 'space-around',
              minHeight: '20',
            })}
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </>
      )}
    </main>
  );
}
