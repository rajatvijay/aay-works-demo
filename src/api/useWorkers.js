import {useCallback, useEffect, useState} from 'react';

/**
 * Hook to fetch all the workers and maintain the fetching state
 * @returns [
 *    workers: Array<Worker>,
 *    status: "idle" | "loading" | "success" | "error",
 *    refetch: Fn to refetch
 * ]
 */
export const useWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [status, setStatus] = useState('idle');

  const fetchWorkers = useCallback(async () => {
    setStatus('loading');
    try {
      const response = await fetch(
        'https://next.json-generator.com/api/json/get/V18taItZ9',
      );
      setWorkers(await response.json());
      setStatus('success');
    } catch (e) {
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  return [workers, status, fetchWorkers];
};
