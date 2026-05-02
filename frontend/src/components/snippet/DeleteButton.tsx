'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { snippetsApi } from '@/lib/api';

type Props = {
  id: string;
};

export default function DeleteButton({ id }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Delete this snippet?')) return;
    setLoading(true);
    try {
      await snippetsApi.delete(id);
      router.push('/');
      router.refresh();
    } catch {
      alert('Failed to delete');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded-md border border-red-800 px-3 py-1.5 text-sm text-red-400 hover:bg-red-900/30 disabled:opacity-50"
    >
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  );
}
