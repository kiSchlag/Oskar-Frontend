import { useState, useEffect } from "react";
import { useDebounce } from "@/02-shared/hooks";
import { searchMulti } from "./search.service";

export function useSearch(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 250);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    searchMulti(debouncedQuery)
      .then((data) => setResults(data.results || []))
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  return { results, loading };
}
