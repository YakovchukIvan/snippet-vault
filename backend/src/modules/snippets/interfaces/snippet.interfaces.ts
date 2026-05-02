export interface ISnippetsQuery {
  page?: string;
  limit?: string;
  q?: string;
  tag?: string;
}

export interface ISnippetsParsedQuery {
  page: number;
  limit: number;
  q?: string;
  tag?: string;
}
