import { useEffect, useState } from 'react';
import { Status, StorageKey, EntityState } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useRequest<T>(fetch: () => Promise<T>, dependencies: any[] = []): EntityState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(undefined);
  const [status, setStatus] = useState(Status.Idle);

  useEffect(() => {
    async function fetchAndSetData() {
      setStatus(Status.Loading);
      const fetchedData = await fetch();
      setData(fetchedData);
      setStatus(Status.Succeeded);
    }
    async function run() {
      try {
        await fetchAndSetData();
      } catch (e) {
        setData(null);
        setStatus(Status.Failed);
        setError(e.response.data);
      }
    }
    run();
  }, dependencies);

  return {
    status,
    data,
    error,
  };
}

interface PaginationProps {
  pageCount: number;
  storageKey: StorageKey;
}

interface PaginationResult {
  currentPage: number;
  openNextPage: () => void;
  openPreviousPage: () => void;
}

export function usePagination({ pageCount, storageKey }: PaginationProps): PaginationResult {
  const storedPage = localStorage.getItem(storageKey);
  const initialPage = storedPage ? Number(storedPage) : 0;
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    localStorage.setItem(storageKey, String(currentPage));
  }, [currentPage]);

  function openNextPage() {
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  }

  function openPreviousPage() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  return { currentPage, openNextPage, openPreviousPage };
}
