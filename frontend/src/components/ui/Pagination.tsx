import Link from 'next/link';

type Props = {
  page: number;
  total: number;
  limit: number;
  searchParams?: Record<string, string | undefined>;
};

function buildUrl(params: Record<string, string | undefined>, page: number) {
  const p = new URLSearchParams();
  if (params.q) p.set('q', params.q);
  if (params.tag) p.set('tag', params.tag);
  if (params.type) p.set('type', params.type);
  p.set('page', String(page));
  return `/?${p.toString()}`;
}

export default function Pagination({ page, total, limit, searchParams = {} }: Props) {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-6">
      {page > 1 ? (
        <Link
          href={buildUrl(searchParams, page - 1)}
          className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-800"
        >
          ← Prev
        </Link>
      ) : (
        <span className="cursor-not-allowed rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-600">
          ← Prev
        </span>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={buildUrl(searchParams, p)}
          className={`rounded-md px-3 py-1.5 text-sm ${
            p === page
              ? 'bg-zinc-100 font-medium text-zinc-900'
              : 'border border-zinc-700 text-zinc-300 hover:bg-zinc-800'
          }`}
        >
          {p}
        </Link>
      ))}

      {page < totalPages ? (
        <Link
          href={buildUrl(searchParams, page + 1)}
          className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-800"
        >
          Next →
        </Link>
      ) : (
        <span className="cursor-not-allowed rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-600">
          Next →
        </span>
      )}
    </div>
  );
}
