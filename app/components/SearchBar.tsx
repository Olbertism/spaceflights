import { faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

export const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearch(searchTerm);
    }, 900);

    return () => clearTimeout(debounce);
  }, [searchTerm, onSearch]);

  const handleResetClick = () => {
    setSearchTerm('');
  };

  const searchBarWrapperStyles = css({
    height: '9',
    margin: 'auto',
    border: 'basic',
    display: 'flex',
    gap: '1',
    padding: '1',
  });

  const searchBarStyles = css({
    height: '100%',
    width: '100%',
  });

  return (
    <div className={flex()}>
      <div className={searchBarWrapperStyles}>
        <div className={flex()}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={css({
              margin: 'auto',
            })}
          />
        </div>
        <input
          type="text"
          placeholder="Suche..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={searchBarStyles}
        />
        <button
          onClick={() => {
            searchTerm && handleResetClick();
          }}
        >
          <FontAwesomeIcon
            icon={faX}
            className={css(
              searchTerm
                ? { color: 'black' }
                : { color: 'neutral', cursor: 'default' },
            )}
          />
        </button>
      </div>
    </div>
  );
};

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}
