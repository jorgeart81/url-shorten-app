import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router';
import { describe, expect, it } from 'vitest';

import { PaginationBar } from '../../../src/components/pagination/PaginationBar';

describe('PaginationBar component', () => {
  const totalPages = 10;
  const showMaxItems = 5;
  const pageMargin = 2;
  const pageNumber = 1;

  function TestQuery() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    return <span data-testid='page'>{params.get('page')}</span>;
  }

  function renderPaginationTest(initialPage: number = 6) {
    return render(
      <MemoryRouter initialEntries={[`/?page=${initialPage}`]}>
        <PaginationBar
          pageNumber={initialPage}
          totalPages={10}
          totalRecords={50}
          pageSize={10}
          pageMargin={2}
          showMaxItems={5}
          hasNextPage
          hasPreviousPage
        />
        <TestQuery />
      </MemoryRouter>
    );
  }

  it('should display buttons with numbers 1, 2, 3, 4, 5', () => {
    render(
      <MemoryRouter>
        <PaginationBar
          pageNumber={pageNumber}
          totalPages={totalPages}
          totalRecords={100}
          pageSize={10}
          pageMargin={pageMargin}
          showMaxItems={showMaxItems}
          hasNextPage
          hasPreviousPage
        />
      </MemoryRouter>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should display prev and next buttons', () => {
    renderPaginationTest();

    const prevButton = screen.getByTestId('prev-button');
    const nextButton = screen.getByTestId('next-button');

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
  });

  it('should navigate to previous page', async () => {
    const user = userEvent.setup();
    renderPaginationTest();

    expect(screen.getByTestId('page').textContent).toBe('6');

    const prevButton = screen.getByTestId('prev-button');
    await user.click(prevButton);

    expect(screen.getByTestId('page').textContent).toBe('5');
  });

  it('should navigate to next page', async () => {
    const user = userEvent.setup();
    renderPaginationTest();

    expect(screen.getByTestId('page').textContent).toBe('6');

    const nextButton = screen.getByTestId('next-button');
    await user.click(nextButton);

    expect(screen.getByTestId('page').textContent).toBe('7');
  });
});
