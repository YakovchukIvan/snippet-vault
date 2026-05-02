import { Suspense } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/ui/SearchBar';
import SnippetList from '@/components/snippet/SnippetList';
import Loader from '@/components/ui/Loader';

type Props = {
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
        <div className="flex h-14 items-center justify-between gap-6 px-8">
          <span className="shrink-0 text-sm font-semibold tracking-wide text-zinc-100">Snippet Vault</span>
          <div className="flex-1 max-w-2xl">
            <Suspense>
              <SearchBar />
            </Suspense>
          </div>
          <Link
            href="/snippets/new"
            className="shrink-0 rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-white"
          >
            + New Snippet
          </Link>
        </div>
      </header>

      <main className="flex-1 px-8 py-8">
        <Suspense fallback={<Loader />}>
          <SnippetList searchParams={params} />
        </Suspense>
      </main>
    </div>
  );
}
