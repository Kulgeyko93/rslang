import { useEffect, useState } from 'react';
import { Status, EntityState } from '../types';

export function useRequest<T>(fetch: () => Promise<T>): EntityState<T> {
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
  }, []);

  return {
    status,
    data,
    error,
  };
}
