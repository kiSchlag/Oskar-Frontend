import { useState, useEffect, useCallback, useRef } from "react";
import { apiFetch } from "@/02-shared/utils";

export function useFetch(endpoint, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const fetchData = useCallback(() => {
    if (!endpoint) {
      setLoading(false);
      return;
    }
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setError(null);

    apiFetch(endpoint)
      .then((result) => {
        if (!controller.signal.aborted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setError(err);
          setLoading(false);
        }
      });
  }, [endpoint]);

  useEffect(() => {
    fetchData();
    return () => abortRef.current?.abort();
  }, [fetchData, ...deps]);

  return { data, loading, error, refetch: fetchData };
}
