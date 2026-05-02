import Link from 'next/link';
import SnippetForm from '@/components/snippet/SnippetForm';

export default function NewSnippetPage() {
  return (
    <div className="px-8 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/" className="text-sm text-zinc-500 transition-colors hover:text-zinc-200">
            ← Back
          </Link>
          <div className="h-4 w-px bg-zinc-800" />
          <h1 className="text-lg font-semibold text-zinc-100">New Snippet</h1>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8">
          <SnippetForm />
        </div>
      </div>
    </div>
  );
}
