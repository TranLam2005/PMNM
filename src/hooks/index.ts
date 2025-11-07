import { restApi } from "@/api/restApi"
import { useEffect, useMemo, useRef, useState } from "react"

export function useDebounce(value: string, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debouncedValue
}

export type SearchParams = {
  q: string;
  category?: string;
  sort?: string;
  range?: string;
  exact?: boolean;
  page?: number;
  pageSize?: number;
};

export function useSearch(params: SearchParams) {
  const { q } = params;

  const debouncedQ = useDebounce(q);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const key = useMemo(() => `${debouncedQ}`, [debouncedQ]);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true); setError(null);

    const qs = new URLSearchParams({
      city: debouncedQ.trim(),
    }).toString();

    restApi.get(`/attp/indicators?${qs}`, { signal: controller.signal })
      .then((r) => (r.status >= 200 && r.status < 300) ? r.data : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then((data) => {
        setItems(data ?? []);
      })
      .catch((e) => { if (e.name !== "AbortError") setError(e.message) })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [key]);

  return { items, loading, error };
}