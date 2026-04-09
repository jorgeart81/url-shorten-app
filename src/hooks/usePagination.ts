import { useEffect, useEffectEvent, useState } from "react";

/**
 * Pagination hook configuration
 * @interface Options
 * @property {number} totalPages - Total number of available pages
 * @property {number} [pageMargin=2] - Number of pages to show before and after the current page
 * @property {number} [maxVisiblePages=5] - Maximum number of pages to display simultaneously
 */
interface Options {
  totalPages: number;
  pageMargin?: number;
  maxVisiblePages?: number;
}

/**
 * Custom hook to manage pagination logic
 * 
 * Calculates which pages should be visible based on the current page,
 * page margin, and maximum number of visible pages.
 * 
 * @param {Options} options - Pagination configuration
 * @returns {Object} Pagination state and methods
 * @returns {number} currentPage - Current page (1-indexed)
 * @returns {boolean} hasNextPage - Whether there is a next page
 * @returns {boolean} hasPrevPage - Whether there is a previous page
 * @returns {number[]} visiblePages - Array of page numbers to display
 * @returns {Function} handleNext - Navigate to the next page
 * @returns {Function} handlePrev - Navigate to the previous page
 * 
 * @example
 * const { currentPage, visiblePages, handleNext, handlePrev } = usePagination({
 *   totalPages: 20,
 *   pageMargin: 2,
 *   maxVisiblePages: 5
 * });
 */
export const usePagination = ({ totalPages, pageMargin = 2, maxVisiblePages = 5 }: Options) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
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
  const calculateVisiblePages = useEffectEvent((pageNumber: number) => {
    const hasHiddenPagesBefore = pageNumber - pageMargin > 1
    const hasHiddenPagesAfter = safeTotalPages > pageNumber + pageMargin
    const hasRightOverflow = pageNumber + pageMargin > maxVisiblePages

    if (visiblePages.length > 0 && !hasRightOverflow) return
    if (!hasHiddenPagesBefore && !hasHiddenPagesAfter) return

    setVisiblePages(Array.from({ length: showLength }, (_, i) => hasRightOverflow ? pageNumber - pageMargin + i : pageNumber + i))
  })

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

  return {
    // State
    currentPage,
    hasNextPage,
    hasPrevPage,
    visiblePages,

    // Methods
    handleNext,
    handlePrev,
  }
}