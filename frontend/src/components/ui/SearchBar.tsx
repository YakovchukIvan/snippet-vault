'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

const SNIPPET_TYPES = ['link', 'note', 'command'] as const;

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get('q') ?? '');
  const [tag, setTag] = useState(searchParams.get('tag') ?? '');
  const [type, setType] = useState(searchParams.get('type') ?? '');

  const apply = useCallback(
    (nextQ: string, nextTag: string, nextType: string) => {
      const params = new URLSearchParams();
      if (nextQ) params.set('q', nextQ);
      if (nextTag) params.set('tag', nextTag);
      if (nextType) params.set('type', nextType);
      router.push(`/?${params.toString()}`);
    },
    [router],
  );

  const reset = () => {
    setQ('');
    setTag('');
    setType('');
    router.push('/');
  };

  return (
    <div className="flex flex-wrap gap-2">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && apply(q, tag, type)}
        placeholder="Search..."
        className="min-w-48 flex-1 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
      />
      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && apply(q, tag, type)}
        placeholder="Tag..."
        className="w-36 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
      />
      <select
        value={type}
        onChange={(e) => {
          setType(e.target.value);
          apply(q, tag, e.target.value);
        }}
        className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-500"
      >
        <option value="">All types</option>
        {SNIPPET_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <button
        onClick={() => apply(q, tag, type)}
        className="rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-white"
      >
        Search
      </button>
      {(q || tag || type) && (
        <button
          onClick={reset}
          className="rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800"
        >
          Reset
        </button>
      )}
    </div>
  );
}
