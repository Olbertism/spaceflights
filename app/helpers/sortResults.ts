import type { PaginatedArticleList } from '~/types/api';

export const sortResults = (
  apiArticles: PaginatedArticleList,
  sortDir: 'asc' | 'desc',
) => {
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
  return { ...apiArticles, results: sortedResults };
};
