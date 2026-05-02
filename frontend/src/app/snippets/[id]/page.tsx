import Link from 'next/link';
import { notFound } from 'next/navigation';
import { snippetsApi } from '@/lib/api';
import { SnippetType } from '@/lib/snippet.types';
import DeleteButton from '@/components/snippet/DeleteButton';

type Props = {
  params: Promise<{ id: string }>;
};

const TYPE_STYLES: Record<SnippetType, string> = {
  [SnippetType.LINK]: 'bg-blue-900/40 text-blue-300 border border-blue-800/50',
  [SnippetType.NOTE]: 'bg-emerald-900/40 text-emerald-300 border border-emerald-800/50',
  [SnippetType.COMMAND]: 'bg-violet-900/40 text-violet-300 border border-violet-800/50',
};

export default async function SnippetPage({ params }: Props) {
  const { id } = await params;

  try {
    const snippet = await snippetsApi.getOne(id);

    return (
      <div className="px-8 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-zinc-500 transition-colors hover:text-zinc-200">
                ← Back
              </Link>
              <div className="h-4 w-px bg-zinc-800" />
              <span className="text-sm text-zinc-400">Snippet details</span>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/snippets/${id}/edit`}
                className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
              >
                Edit
              </Link>
              <DeleteButton id={id} />
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <h1 className="text-xl font-semibold text-zinc-100">{snippet.title}</h1>
              <span className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-medium ${TYPE_STYLES[snippet.type]}`}>
                {snippet.type}
              </span>
            </div>

            <pre className="mb-6 whitespace-pre-wrap wrap-break-word rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-300">
              {snippet.content}
            </pre>

            {snippet.tags.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {snippet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs text-zinc-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="border-t border-zinc-800 pt-4">
              <p className="text-xs text-zinc-500">
                Created{' '}
                {new Date(snippet.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                {snippet.updatedAt !== snippet.createdAt && (
                  <>
                    {' '}
                    · Updated{' '}
                    {new Date(snippet.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
