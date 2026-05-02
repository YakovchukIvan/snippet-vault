'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { snippetsApi } from '@/lib/api';
import { CreateSnippetPayload, Snippet, SnippetType, UpdateSnippetPayload } from '@/lib/snippet.types';

type Props = {
  snippet?: Snippet;
};

const TYPES = Object.values(SnippetType);

export default function SnippetForm({ snippet }: Props) {
  const router = useRouter();
  const isEdit = !!snippet;

  const [title, setTitle] = useState(snippet?.title ?? '');
  const [content, setContent] = useState(snippet?.content ?? '');
  const [tags, setTags] = useState(snippet?.tags.join(', ') ?? '');
  const [type, setType] = useState<SnippetType>(snippet?.type ?? SnippetType.NOTE);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!title.trim()) return 'Title is required';
    if (!content.trim()) return 'Content is required';
    return '';
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setLoading(true);

    const parsedTags = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      if (isEdit) {
        const payload: UpdateSnippetPayload = { title, content, tags: parsedTags, type };
        await snippetsApi.update(snippet.id, payload);
        router.push(`/snippets/${snippet.id}`);
      } else {
        const payload: CreateSnippetPayload = { title, content, tags: parsedTags, type };
        const created = await snippetsApi.create(payload);
        router.push(`/snippets/${created.id}`);
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-zinc-400">Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Snippet title"
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-zinc-400">Type *</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as SnippetType)}
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-zinc-400">Content *</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Snippet content"
          rows={6}
          className="w-full resize-none rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-zinc-400">Tags (comma separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="react, typescript, hooks"
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-white disabled:opacity-50"
        >
          {loading ? 'Saving...' : isEdit ? 'Save' : 'Create'}
        </button>
        <button
          onClick={() => router.back()}
          className="rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
