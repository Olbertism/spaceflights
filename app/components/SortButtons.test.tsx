import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SortButtons } from './SortButtons';

describe('SortButtons Component', () => {
  it('renders sort buttons correctly', () => {
    render(
      <SortButtons
        onSortByPublishedAt={() => {}}
        onSortByTitle={() => {}}
        sortByPublishedAt={null}
        sortByTitle={null}
      />,
    );

    expect(screen.getByText('abc')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /abc/i })).toBeInTheDocument();
  });

  it('calls onSortByTitle when title sort button is clicked', () => {
    const mockOnSortByTitle = vi.fn();
    render(
      <SortButtons
        onSortByPublishedAt={() => {}}
        onSortByTitle={mockOnSortByTitle}
        sortByPublishedAt={null}
        sortByTitle={'asc'}
      />,
    );

    fireEvent.click(screen.getByText('abc'));
    expect(mockOnSortByTitle).toHaveBeenCalledWith('desc');
  });

  it('calls onSortByPublishedAt when date sort button is clicked', () => {
    const mockOnSortByPublishedAt = vi.fn();
    render(
      <SortButtons
        onSortByPublishedAt={mockOnSortByPublishedAt}
        onSortByTitle={() => {}}
        sortByPublishedAt={'desc'}
        sortByTitle={null}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'published-at-sort' }));
    expect(mockOnSortByPublishedAt).toHaveBeenCalledWith('asc');
  });
});
