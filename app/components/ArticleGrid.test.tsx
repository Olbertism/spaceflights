import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockArticles } from '~/mocks/mocks';
import { ArticleGrid } from './ArticleGrid';

describe('ArticleGrid Component', () => {
  it('renders article grid with articles', () => {
    render(<ArticleGrid apiArticles={mockArticles} />);

    expect(screen.getByText('Test Article 1')).toBeInTheDocument();
    expect(screen.getByText('Test Article 2')).toBeInTheDocument();
  });

  it('renders article links correctly', () => {
    render(<ArticleGrid apiArticles={mockArticles} />);

    expect(
      screen.getByRole('link', { name: /test article 1/i }),
    ).toHaveAttribute('href', 'https://example.com/article1');
    expect(
      screen.getByRole('link', { name: /test article 2/i }),
    ).toHaveAttribute('href', 'https://example.com/article2');
  });

  it('renders article images with correct alt text', () => {
    render(<ArticleGrid apiArticles={mockArticles} />);

    expect(screen.getByAltText('Test Article 1')).toBeInTheDocument();
    expect(screen.getByAltText('Test Article 2')).toBeInTheDocument();
  });
});
