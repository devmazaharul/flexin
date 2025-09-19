'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

type SearchMenuProps = {
  onSearch?: (q: string) => Promise<void> | void; // optional callback
  placeholder?: string;
  debounceMs?: number;
};

export default function SearchMenu({
  onSearch,
  placeholder = 'Search products…',
  debounceMs = 300,
}: SearchMenuProps) {
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Keyboard shortcuts: Ctrl/⌘+K or "/" to focus
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      const isSlash = !e.metaKey && !e.ctrlKey && e.key === '/';
      if (isCmdK || isSlash) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        // Esc clears query & blur
        setQ('');
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Debounced search (fires when q changes)
  useEffect(() => {
    if (!onSearch) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        await onSearch(q.trim());
      } finally {
        setLoading(false);
      }
    }, debounceMs);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [q, onSearch, debounceMs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSearch) return;
    try {
      setLoading(true);
      await onSearch(q.trim());
    } finally {
      setLoading(false);
    }
  };

  const clear = () => setQ('');

  return (
    <form onSubmit={handleSubmit} className="w-full">
      
      <div
        className="
          group flex items-center gap-2 w-full
          rounded-xl border border-gray-200 bg-gray-100/30
          px-3 py-1 shadow-2xl
          focus-within:ring-2 focus-within:ring-gray-300
          transition-all duration-200
          hover:bg-white hover:border-gray-300
          dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-900/80 dark:focus-within:ring-gray-500
        "
        role="search"
        aria-label="Site search"
      >
        <Search className="h-4 w-4 text-gray-500 dark:text-zinc-400" aria-hidden />

        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          name="search"
          autoComplete="off"
          className="
            flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400
            outline-none border-none
            dark:text-zinc-100 dark:placeholder-zinc-500
          "
          aria-label="Search input"
        />

        {/* Hint (desktop) */}
        <kbd
          className="
            hidden md:inline-flex items-center gap-1 text-[10px]
            px-1.5 py-0.5 rounded-md border bg-white text-gray-500 border-gray-200
            dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400
          "
          title="Press Ctrl/⌘ K to focus"
        >
          ⌘K
        </kbd>

        {/* Clear / Loading / Submit */}
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin text-gray-400" aria-label="Searching…" />
        ) : q ? (
          <button
            type="button"
            onClick={clear}
            className="
              p-1 rounded-full hover:bg-gray-200 active:scale-95 transition
              dark:hover:bg-zinc-800
            "
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-gray-500 dark:text-zinc-400" />
          </button>
        ) : null}

        <button
          type="submit"
          className="
            hidden sm:inline-flex items-center gap-1 text-xs font-medium
            px-2.5 py-1.5 rounded-xl cursor-pointer
            bg-gray-600 text-white hover:bg-gray-700 active:scale-95 transition
            disabled:opacity-60 disabled:cursor-not-allowed
          "
          disabled={loading}
          aria-label="Submit search"
        >
          Search
        </button>
      </div>
    </form>
  );
}
