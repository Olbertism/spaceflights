import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SearchBar } from './SearchBar';

describe('SearchBar Component', () => {
  it('renders input and buttons correctly', () => {
    render(<SearchBar onSearch={() => {}} />);

    expect(screen.getByPlaceholderText('Suche...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<SearchBar onSearch={() => {}} />);
    const input = screen.getByPlaceholderText('Suche...');

    fireEvent.change(input, { target: { value: 'Test' } });
    expect(input).toHaveValue('Test');
  });

  it('calls onSearch with debounce after typing', async () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Suche...');

    fireEvent.change(input, { target: { value: 'Test' } });

    await waitFor(
      () => {
        expect(mockOnSearch).toHaveBeenCalledWith('Test');
      },
      { timeout: 1000 },
    );
  });

  it('clears input when reset button is clicked', () => {
    render(<SearchBar onSearch={() => {}} />);
    const input = screen.getByPlaceholderText('Suche...');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'Test' } });
    expect(input).toHaveValue('Test');

    fireEvent.click(button);
    expect(input).toHaveValue('');
  });
});
