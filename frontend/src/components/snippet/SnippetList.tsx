import { snippetsApi } from '@/lib/api';
import SnippetCard from '@/components/snippet/SnippetCard';
import EmptyState from '@/components/ui/EmptyState';
import ErrorState from '@/components/ui/ErrorState';
import Pagination from '@/components/ui/Pagination';

type Props = {
  searchParams: Record<string, string | undefined>;
};

const LIMIT = 9;

export default async function SnippetList({ searchParams }: Props) {
  const page = Number(searchParams.page ?? 1);

  try {
    const data = await snippetsApi.getAll({
      q: searchParams.q,
      tag: searchParams.tag,
      type: searchParams.type,
      page,
      limit: LIMIT,
    });

    if (data.data.length === 0) {
      return <EmptyState message="No snippets found" />;
    }

    return (
      <>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.data.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
        <Pagination page={page} total={data.total} limit={LIMIT} searchParams={searchParams} />
      </>
    );
  } catch {
    return <ErrorState message="Failed to load snippets" />;
  }
}
