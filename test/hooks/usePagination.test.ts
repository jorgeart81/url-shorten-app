import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePagination } from "../../src/hooks/usePagination";

describe("usePagination hook", () => {
  const totalPages = 5
  const maxVisiblePages = 5
  const pageMargin = 2

  it("should increment current page", () => {
    const { result } = renderHook(() =>
      usePagination({ totalPages })
    );

    act(() => {
      result.current.handleNext();
    });

    expect(result.current.currentPage).toBe(2);
  });

  it("should not go below page 1", () => {
    const { result } = renderHook(() =>
      usePagination({ totalPages })
    );

    act(() => {
      result.current.handlePrev();
    });

    expect(result.current.currentPage).toBe(1);
  });

  it("should not exceed the total number of pages", () => {
    const totalPages = 10
    const { result } = renderHook(() =>
      usePagination({ totalPages: totalPages, maxVisiblePages, pageMargin })
    );

    Array.from({ length: totalPages + 2 }).forEach(() => act(() => {
      result.current.handleNext();
    }))

    expect(result.current.currentPage).toBe(totalPages);
  });

  it("should return correct visible pages", () => {
    const { result } = renderHook(() =>
      usePagination({ totalPages: 10, maxVisiblePages, pageMargin })
    );

    expect(result.current.visiblePages).toEqual([1, 2, 3, 4, 5]);

    Array.from({ length: pageMargin }).forEach(() => act(() => {
      result.current.handleNext();
    }))

    expect(result.current.visiblePages).toEqual([1, 2, 3, 4, 5]);

    act(() => {
      result.current.handleNext();
    });

    expect(result.current.visiblePages).toEqual([2, 3, 4, 5, 6]);
  });

  it("should limit visible pages", () => {
    const { result } = renderHook(() =>
      usePagination({ totalPages, maxVisiblePages })
    );

    expect(result.current.visiblePages.length).toBe(5);
  });

  it("should not exceed totalPages", () => {
    const { result } = renderHook(() =>
      usePagination({ totalPages })
    );

    Array.from({ length: totalPages * 2 }).forEach(() => act(() => {
      result.current.handleNext();
    }))

    expect(result.current.currentPage).toBe(5);
  });
});