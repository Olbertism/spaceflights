import type { PaginatedArticleList } from '~/types/api';

export const mockArticles: PaginatedArticleList = {
  count: 2,
  results: [
    {
      id: 1,
      title: 'Test Article 1',
      summary: 'This is a summary of test article 1.',
      url: 'https://example.com/article1',
      image_url: 'https://example.com/image1.jpg',
      news_site: 'Example News',
      published_at: '2024-02-12T12:00:00Z',
      authors: [],
      updated_at: '',
      launches: [],
      events: [],
    },
    {
      id: 2,
      title: 'Test Article 2',
      summary: 'This is a summary of test article 2.',
      url: 'https://example.com/article2',
      image_url: 'https://example.com/image2.jpg',
      news_site: 'Example News',
      published_at: '2024-02-11T15:30:00Z',
      authors: [],
      updated_at: '',
      launches: [],
      events: [],
    },
  ],
};
