import {
  faCalendarDay,
  faSort,
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FC } from 'react';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

const sortButtonWrapperStyles = css({
  display: 'flex',
  margin: 'auto',
  gap: '3',
});

const sortButtonStyles = css({
  width: '14',
  display: 'flex',
  gap: '1',
  padding: '1',
  justifyContent: 'space-between',
  border: 'basic',
});

const sortArrowStyles = css({
  color: 'neutral',
  height: '50%',
  margin: 'auto',
});

const sortLabelStyles = css({
  color: 'primary',
  margin: 'auto',
});

export const SortButtons: FC<SortButtonsProps> = ({
  onSortByPublishedAt,
  onSortByTitle,
  sortByPublishedAt,
  sortByTitle,
}) => {
  const handleSortByPublishedAt = () => {
    return sortByPublishedAt === 'asc'
      ? onSortByPublishedAt('desc')
      : onSortByPublishedAt('asc');
  };

  const handleSortByTitle = () => {
    return sortByTitle === 'asc' ? onSortByTitle('desc') : onSortByTitle('asc');
  };
  return (
    <div className={flex()}>
      <div className={sortButtonWrapperStyles}>
        <button className={sortButtonStyles} onClick={handleSortByTitle}>
          {sortByTitle ? (
            sortByTitle === 'asc' ? (
              <FontAwesomeIcon icon={faSortUp} className={sortArrowStyles} />
            ) : (
              <FontAwesomeIcon icon={faSortDown} className={sortArrowStyles} />
            )
          ) : (
            <FontAwesomeIcon icon={faSort} className={sortArrowStyles} />
          )}
          <p className={sortLabelStyles}>abc</p>
        </button>
        <button
          className={sortButtonStyles}
          onClick={handleSortByPublishedAt}
          aria-label="published-at-sort"
        >
          {sortByPublishedAt ? (
            sortByPublishedAt === 'asc' ? (
              <FontAwesomeIcon icon={faSortUp} className={sortArrowStyles} />
            ) : (
              <FontAwesomeIcon icon={faSortDown} className={sortArrowStyles} />
            )
          ) : (
            <FontAwesomeIcon icon={faSort} className={sortArrowStyles} />
          )}
          <FontAwesomeIcon icon={faCalendarDay} className={sortLabelStyles} />
        </button>
      </div>
    </div>
  );
};

interface SortButtonsProps {
  onSortByPublishedAt: (sortDir: 'asc' | 'desc') => void;
  onSortByTitle: (sortDir: 'asc' | 'desc') => void;
  sortByPublishedAt: 'asc' | 'desc' | null;
  sortByTitle: 'asc' | 'desc' | null;
}
