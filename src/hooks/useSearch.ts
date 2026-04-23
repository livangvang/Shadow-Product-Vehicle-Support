"use client";

import { useState, useMemo } from "react";
import { useDebounce } from "./useDebounce";

interface UseSearchProps<T> {
  data: T[];
  // Field names to include in full-text search. Using `string` (not `keyof T`)
  // so callers can pass fields that only exist on some variants of a union
  // type (e.g. STFilterVehicle-only fields on `ProductVehicle | STFilterVehicle`).
  // Missing fields on an item simply contribute nothing to the haystack.
  searchFields: readonly string[];
  debounceMs?: number;
}

interface UseSearchReturn<T> {
  query: string;
  setQuery: (q: string) => void;
  results: T[];
}

export function useSearch<T>({
  data,
  searchFields,
  debounceMs = 300,
}: UseSearchProps<T>): UseSearchReturn<T> {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, debounceMs);

  const results = useMemo(() => {
    const tokens = debouncedQuery
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (tokens.length === 0) return data;

    return data.filter((item) => {
      const record = item as unknown as Record<string, unknown>;
      const haystack = searchFields
        .map((field) => {
          const value = record[field];
          return typeof value === "string" ? value.toLowerCase() : "";
        })
        .join(" ");

      return tokens.every((token) => haystack.includes(token));
    });
  }, [data, debouncedQuery, searchFields]);

  return { query, setQuery, results };
}
