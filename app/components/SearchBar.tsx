import type { FC } from 'react';
import { useEffect, useState } from 'react';

export const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearch(searchTerm);
    }, 900);

    return () => clearTimeout(debounce);
  }, [searchTerm, onSearch]);

  return (
    <div className="">
      <input
        type="text"
        placeholder="Suche..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className=""
      />
      <span>X</span>
    </div>
  );
};

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}
