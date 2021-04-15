import React from 'react';
import { Button } from 'react-bootstrap';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';

interface Props {
  currentPage: number;
  onPreviousClick: () => void;
  onNextClick: () => void;
}

export default function Pagination(props: Props): JSX.Element {
  const { onPreviousClick, onNextClick, currentPage } = props;
  const displayedPageNumber = currentPage + 1;
  return (
    <p className="page-number">
      <Button variant="light">
        <ArrowLeft onClick={onPreviousClick} />
      </Button>
      &nbsp;&nbsp;
      {displayedPageNumber}
      &nbsp;&nbsp;
      <Button variant="light">
        <ArrowRight onClick={onNextClick} />
      </Button>
    </p>
  );
}
