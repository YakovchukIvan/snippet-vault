export enum SnippetType {
  LINK = 'link',
  NOTE = 'note',
  COMMAND = 'command',
}

export interface Snippet {
  id: string;
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedSnippets {
  data: Snippet[];
  total: number;
  page: number;
  limit: number;
}

export interface SnippetsQuery {
  page?: number;
  limit?: number;
  q?: string;
  tag?: string;
  type?: string;
}

export interface CreateSnippetPayload {
  title: string;
  content: string;
  tags?: string[];
  type: SnippetType;
}

export interface UpdateSnippetPayload {
  title?: string;
  content?: string;
  tags?: string[];
  type?: SnippetType;
}
