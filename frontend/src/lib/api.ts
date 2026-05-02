import { CreateSnippetPayload, PaginatedSnippets, Snippet, SnippetsQuery, UpdateSnippetPayload } from './snippet.types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Something went wrong' }));
    throw new Error((error as { message?: string }).message ?? 'Something went wrong');
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

export const snippetsApi = {
  getAll: (query?: SnippetsQuery): Promise<PaginatedSnippets> => {
    const params = new URLSearchParams();
    if (query?.page) params.set('page', String(query.page));
    if (query?.limit) params.set('limit', String(query.limit));
    if (query?.q) params.set('q', query.q);
    if (query?.tag) params.set('tag', query.tag);
    if (query?.type) params.set('type', query.type);
    const qs = params.toString();
    return request<PaginatedSnippets>(`/snippets${qs ? `?${qs}` : ''}`);
  },

  getOne: (id: string): Promise<Snippet> => request<Snippet>(`/snippets/${id}`),

  create: (payload: CreateSnippetPayload): Promise<Snippet> =>
    request<Snippet>('/snippets', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  update: (id: string, payload: UpdateSnippetPayload): Promise<Snippet> =>
    request<Snippet>(`/snippets/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  delete: (id: string): Promise<void> => request<void>(`/snippets/${id}`, { method: 'DELETE' }),
};
