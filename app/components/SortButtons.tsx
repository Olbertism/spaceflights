import { faCalendarDay, faSort } from '@fortawesome/free-solid-svg-icons';
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
  width: '12',
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
  height: '60%',
  margin: 'auto',
});

export const SortButtons: FC = () => {
  return (
    <div className={flex()}>
      <div className={sortButtonWrapperStyles}>
        <button className={sortButtonStyles}>
          <FontAwesomeIcon icon={faSort} className={sortArrowStyles} />
          <p className={sortLabelStyles}>abc</p>
        </button>
        <button className={sortButtonStyles}>
          <FontAwesomeIcon icon={faSort} className={sortArrowStyles} />
          <FontAwesomeIcon icon={faCalendarDay} className={sortLabelStyles} />
        </button>
      </div>
    </div>
  );
};
