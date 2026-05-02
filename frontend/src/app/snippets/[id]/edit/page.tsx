import Link from 'next/link';
import { notFound } from 'next/navigation';
import { snippetsApi } from '@/lib/api';
import SnippetForm from '@/components/snippet/SnippetForm';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditSnippetPage({ params }: Props) {
  const { id } = await params;

  try {
    const snippet = await snippetsApi.getOne(id);

    return (
      <div className="px-8 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center gap-4">
            <Link href={`/snippets/${id}`} className="text-sm text-zinc-500 transition-colors hover:text-zinc-200">
              ← Back
            </Link>
            <div className="h-4 w-px bg-zinc-800" />
            <h1 className="text-lg font-semibold text-zinc-100">Edit Snippet</h1>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8">
            <SnippetForm snippet={snippet} />
          </div>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
