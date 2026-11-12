import { useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/supabaseClient";

type SupabaseDataListProps<T> = {
  table: string;
  select?: string;
  limit?: number;
  getKey: (row: T) => string | number;
  renderRow: (row: T) => ReactNode;
  emptyMessage?: string;
};

export function SupabaseDataList<T>({
  table,
  select = "*",
  limit = 100,
  getKey,
  renderRow,
  emptyMessage = "No records found.",
}: SupabaseDataListProps<T>) {
  const [rows, setRows] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isCurrentRequest = true;

    async function fetchRows() {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error: queryError } = await supabase
          .from(table)
          .select(select)
          .limit(limit)
          .returns<T[]>();

        if (!isCurrentRequest) return;

        if (queryError) {
          setError(queryError.message);
          setRows([]);
        } else if (data === null) {
          setError("Supabase returned no data.");
          setRows([]);
        } else {
          setRows(data);
        }
      } catch (cause: unknown) {
        if (!isCurrentRequest) return;

        setRows([]);
        setError(cause instanceof Error ? cause.message : "An unexpected error occurred.");
      } finally {
        if (isCurrentRequest) setIsLoading(false);
      }
    }

    void fetchRows();

    return () => {
      isCurrentRequest = false;
    };
  }, [table, select, limit, retryCount]);

  if (isLoading) {
    return (
      <p role="status" aria-live="polite" className="text-sm text-zinc-600">
        Loading…
      </p>
    );
  }

  if (error) {
    return (
      <div role="alert" className="space-y-3 text-sm text-red-700">
        <p>Unable to load data: {error}</p>
        <button
          type="button"
          onClick={() => setRetryCount((count) => count + 1)}
          className="rounded-lg border border-red-300 px-4 py-2 font-semibold transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          Try again
        </button>
      </div>
    );
  }

  if (rows.length === 0) {
    return <p className="text-sm text-zinc-600">{emptyMessage}</p>;
  }

  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={getKey(row)}>{renderRow(row)}</li>
      ))}
    </ul>
  );
}
