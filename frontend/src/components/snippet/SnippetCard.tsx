import Link from 'next/link';
import { Snippet, SnippetType } from '@/lib/snippet.types';

type Props = {
  snippet: Snippet;
};

const TYPE_STYLES: Record<SnippetType, string> = {
  [SnippetType.LINK]: 'bg-blue-900/40 text-blue-300',
  [SnippetType.NOTE]: 'bg-emerald-900/40 text-emerald-300',
  [SnippetType.COMMAND]: 'bg-violet-900/40 text-violet-300',
};

export default function SnippetCard({ snippet }: Props) {
  return (
    <Link href={`/snippets/${snippet.id}`} className="block">
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 transition hover:border-zinc-600 hover:bg-zinc-800/60">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h2 className="line-clamp-1 text-sm font-medium text-zinc-100">{snippet.title}</h2>
          <span className={`shrink-0 rounded px-2 py-0.5 text-xs font-medium ${TYPE_STYLES[snippet.type]}`}>
            {snippet.type}
          </span>
        </div>
        <p className="mb-3 line-clamp-2 text-xs text-zinc-400">{snippet.content}</p>
        {snippet.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {snippet.tags.map((tag) => (
              <span key={tag} className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-400">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
