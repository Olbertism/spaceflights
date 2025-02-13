import type { FC } from 'react';
import { css } from 'styled-system/css';

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div
      className={css({
        display: 'flex',
        margin: 'auto',
        width: '64',
      })}
    >
      <div
        className={css({
          display: 'flex',
          width: '100%',
          justifyContent: 'space-evenly',
          gap: '3',
        })}
      >
        <button onClick={handlePrev} disabled={currentPage === 1} className="">
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className=""
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
