import { useEffect, useState } from "react";

/**
 * Pagination hook configuration
 * @interface Options
 * @property {number} totalPages - Total number of available pages
 * @property {number} [pageMargin=2] - Number of pages to show before and after the current page
 * @property {number} [maxVisiblePages=5] - Maximum number of pages to display simultaneously
 */
interface Options {
  totalPages: number;
  defaultPage: number;
  pageMargin?: number;
  maxVisiblePages?: number;
  startPage?: number;
}

/**
 * usePagination - Custom React hook for managing pagination state and logic.
 *
 * @param {Object} options - Pagination configuration options.
 * @param {number} options.totalPages - Total number of available pages.
 * @param {number} options.defaultPage - Initial page (1-indexed).
 * @param {number} [options.pageMargin=2] - Number of pages to show before and after the current page.
 * @param {number} [options.maxVisiblePages=5] - Maximum number of page buttons to display.
 * @param {number} [options.startPage=1] - The first page number (default is 1).
 *
 * @returns {Object} Pagination state and handlers.
 * @returns {number} currentPage - The current active page.
 * @returns {boolean} hasNextPage - Whether there is a next page.
 * @returns {boolean} hasPrevPage - Whether there is a previous page.
 * @returns {number[]} visiblePages - Array of page numbers to display in the pagination control.
 * @returns {Function} handleNext - Advances to the next page.
 * @returns {Function} handlePrev - Goes back to the previous page.
 * @returns {Function} changeCurrentPage - Sets the current page to a specific value.
 *
 * @example
 * const {
 *   currentPage,
 *   visiblePages,
 *   handleNext,
 *   handlePrev,
 *   changeCurrentPage
 * } = usePagination({
 *   totalPages: 20,
 *   defaultPage: 1,
 *   pageMargin: 2,
 *   maxVisiblePages: 5
 * });
 */
export const usePagination = ({ totalPages, defaultPage, pageMargin = 2, maxVisiblePages = 5, startPage = 1 }: Options) => {
  if (defaultPage > totalPages) {
    throw new Error("defaultPage cannot be greater than totalPages");
  }
  if (defaultPage < startPage) {
    throw new Error("defaultPage cannot be less than startPage");
  }

  const [currentPage, setCurrentPage] = useState<number>(defaultPage)
  const [visiblePages, setVisiblePages] = useState<number[]>([])

  const safeTotalPages = Math.max(totalPages, 0);
  const showLength = Math.min(safeTotalPages, maxVisiblePages);
  const hasNextPage = currentPage < safeTotalPages
  const hasPrevPage = currentPage > 1

  /**
   * Calculates which pages should be visible based on the current page
   * Only executes when navigation methods (handleNext/handlePrev) are called
   *
   * @param {number} pageNumber - The page number to calculate visible pages for
   */
  const calculateVisiblePages = (pageNumber: number) => {
    const hasRightOverflow = pageNumber + pageMargin > maxVisiblePages
    const hasHiddenPagesBefore = pageNumber - pageMargin > 1
    const hasHiddenPagesAfter = safeTotalPages > pageNumber + pageMargin

    if (!hasHiddenPagesBefore) {
      setVisiblePages(Array.from({ length: showLength }, (_, i) => startPage + i))
      return
    }

    if (!hasHiddenPagesAfter) {
      setVisiblePages(Array.from({ length: showLength }, (_, i) => safeTotalPages - maxVisiblePages + 1 + i))
      return
    }

    setVisiblePages(Array.from({ length: showLength }, (_, i) => hasRightOverflow ? pageNumber - pageMargin + i : pageNumber + i))
  }

  useEffect(() => {
    calculateVisiblePages(currentPage)
  }, [currentPage])

  const handlePrev = () => {
    if (!hasPrevPage) return;
    setCurrentPage(prev => --prev)
  };

  const handleNext = () => {
    if (!hasNextPage) return;
    setCurrentPage(prev => ++prev)
  };

  const changeCurrentPage = (pageNumber: number) => setCurrentPage(pageNumber)

  return {
    // State
    currentPage,
    hasNextPage,
    hasPrevPage,
    visiblePages,

    // Methods
    handleNext,
    handlePrev,
    changeCurrentPage,
  }
}