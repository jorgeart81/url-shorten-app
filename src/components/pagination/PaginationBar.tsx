import { type FC } from 'react';
import { useNavigate } from 'react-router';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

interface Props {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageMargin?: number;
  showMaxItems?: number;
}

export const PaginationBar: FC<Props> = ({
  pageNumber,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  pageMargin = 2,
  showMaxItems = 5,
}) => {
  const isLimitExceeded = totalPages > showMaxItems;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const sliceStart = Math.min(
    Math.max(pageNumber - pageMargin - 1, 0),
    showMaxItems
  );
  const sliceEnd = Math.min(
    Math.max(pageNumber + pageMargin, showMaxItems),
    totalPages
  );
  const showItems = isLimitExceeded
    ? pageNumbers.slice(sliceStart, sliceEnd)
    : pageNumbers;

  const navigate = useNavigate();

  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', page.toString());
    return `?${params.toString()}`;
  };

  const handlePrev = () => {
    if (pageNumber <= 1) return;
    navigate(buildPageUrl(pageNumber - 1), { viewTransition: true });
  };

  const handleNext = () => {
    if (pageNumber >= totalPages) return;
    navigate(buildPageUrl(pageNumber + 1), { viewTransition: true });
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          onClick={handlePrev}
          hidden={!hasPreviousPage || !isLimitExceeded}
        >
          <PaginationPrevious />
        </PaginationItem>

        <PaginationItem
          hidden={pageNumber - pageMargin <= 1 || !isLimitExceeded}
        >
          <PaginationEllipsis />
        </PaginationItem>

        {showItems.map((number) => (
          <PaginationItem
            key={number}
            onClick={() => {
              navigate(buildPageUrl(number));
            }}
          >
            <PaginationLink isActive={pageNumber == number}>
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem hidden={totalPages - pageNumber <= pageMargin}>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem
          onClick={handleNext}
          hidden={!hasNextPage || !isLimitExceeded}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
