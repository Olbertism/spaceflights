import type { MetaFunction } from '@vercel/remix';
import { useCallback, useEffect, useState } from 'react';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';
import { Pagination } from '~/components/Pagination';
import { SearchBar } from '~/components/SearchBar';
import { SortButtons } from '~/components/SortButtons';
import type { PaginatedArticleList } from '~/types/Api';

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

  const [searchTerm, setSearchTerm] = useState('');
  const [sortByPublishedAt, setSortByPublishedAt] = useState<
    'asc' | 'desc' | null
  >(null);

  const [sortByTitle, setSortByTitle] = useState<'asc' | 'desc' | null>(null);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = useCallback(async (url: string) => {
    setIsLoading(true);
    const response = await fetch(url);
    if (response.ok) {
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
      setSearchTerm(searchTerm);
      fetchData(
        `https://api.spaceflightnewsapi.net/v4/articles/${searchTerm && '?title_contains=' + searchTerm}`,
      );
    },
    [fetchData],
  );

  const onSortByPublishedAt = useCallback(
    (sortDir: 'asc' | 'desc') => {
      setSearchTerm('');
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
      setSearchTerm('');
      setSortByPublishedAt(null);
      setSortByTitle(sortDir);
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
      console.log(pageNumber);
      if (pageNumber < currentPage) {
        apiArticles && apiArticles.previous && fetchData(apiArticles.previous);
      } else {
        apiArticles && apiArticles.next && fetchData(apiArticles.next);
      }
      setCurrentPage(pageNumber);
    },
    [currentPage, apiArticles, fetchData],
  );

  const gridItemStyles = css({
    display: 'flex',
    flexDir: 'column',
    gap: '1',
    bg: 'accent',
    border: 'basic',
  });

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
        <div>Loading...</div>
      ) : hasApiError ? (
        <div>Unable to fetch data</div>
      ) : (
        <>
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: '1fr',
              sm: { gridTemplateColumns: 'repeat(2, 1fr)' },
              lg: { gridTemplateColumns: 'repeat(3, 1fr)' },
              xl: { gridTemplateColumns: 'repeat(4, 1fr)' },
              gridTemplateRows: 'min-content auto',
              columnGap: '6',
              rowGap: '4',
            })}
          >
            {apiArticles.results.map((result) => {
              return (
                <div key={result.id} className={gridItemStyles}>
                  <div
                    className={flex({
                      height: '100%',
                    })}
                  >
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noreferrer"
                      className={flex({})}
                    >
                      <img
                        src={result.image_url}
                        alt={result.title}
                        className={css({ margin: 'auto' })}
                      />
                    </a>
                  </div>

                  <div
                    className={css({
                      padding: '2',
                    })}
                  >
                    <h3 className={css({ fontWeight: 'bold' })}>
                      {result.title}
                    </h3>
                    <p>{result.summary.slice(0, 100) + '...'}</p>
                    <div
                      className={css({
                        color: 'neutral',
                      })}
                    >
                      <span>{result.news_site}</span>
                      <span> | </span>
                      <span>
                        {new Date(result.published_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
