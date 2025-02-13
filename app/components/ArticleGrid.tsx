import type { FC } from 'react';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';
import type { PaginatedArticleList } from '~/types/api';

const gridItemStyles = css({
  display: 'flex',
  flexDir: 'column',
  gap: '1',
  bg: 'accent',
  border: 'basic',
});

export const ArticleGrid: FC<ArticleGridProps> = ({ apiArticles }) => {
  return (
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
                justifyContent: 'space-around',
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
                  className={css({
                    margin: 'auto',
                    _hover: { opacity: '75%' },
                  })}
                />
              </a>
            </div>

            <div
              className={css({
                padding: '2',
              })}
            >
              <h3 className={css({ fontWeight: 'bold' })}>{result.title}</h3>
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
  );
};

interface ArticleGridProps {
  apiArticles: PaginatedArticleList;
}
