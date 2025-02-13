import type { MetaFunction } from '@vercel/remix';
import { useCallback, useEffect, useState } from 'react';
import { css } from 'styled-system/css';
import { Pagination } from '~/components/Pagination';
import { SearchBar } from '~/components/SearchBar';
import { SortButtons } from '~/components/SortButtons';
import type { PaginatedArticleList } from '~/types/Api';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
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

  // initial fetch
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const url = `https://api.spaceflightnewsapi.net/v4/articles${searchTerm && '/?title_contains=abc'}`;
      const response = await fetch(url);
      if (response.ok) {
        const articles = await response.json();
        setApiArticles(articles);
      } else {
        setHasApiError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [searchTerm]);

  const onSearch = useCallback((searchTerm: string) => {
    console.log(searchTerm);
    setSearchTerm(searchTerm);
  }, []);

  const gridItemStyles = css({
    display: 'flex',
    flexDir: 'column',
    bg: 'secondary',
    border: 'basic',
    justifyContent: 'space-between',
  });

  return (
    <main className={css({ padding: '4' })}>
      <div
        className={css({
          width: '100%',
          display: 'flex',
          flexDir: 'column',
          justifyContent: 'space-between',
          md: { flexDir: 'row' },
        })}
      >
        <div className={css({ fontSize: '2xl', fontWeight: 'bold' })}>
          Spaceflights News
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
          <SortButtons />
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
              columnGap: '6',
              rowGap: '4',
            })}
          >
            {apiArticles.results.map((result) => {
              return (
                <div key={result.id} className={gridItemStyles}>
                  <a href={result.url} target="_blank" rel="noreferrer">
                    <img src={result.image_url} alt={result.title} />
                  </a>
                  <h3>{result.title}</h3>
                  <p>{result.summary.slice(0, 100) + '...'}</p>
                  <div>
                    <span>{result.news_site}</span>
                    <span> | </span>
                    <span>
                      {new Date(result.published_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className={css({
              display: 'flex',
              justifyContent: 'space-around',
              height: '20',
            })}
          >
            <Pagination
              currentPage={1}
              totalPages={10}
              onPageChange={() => console.log('change')}
            />
          </div>
        </>
      )}
    </main>
  );
}
