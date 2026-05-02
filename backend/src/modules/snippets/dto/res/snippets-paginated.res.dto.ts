import { SnippetResDto } from './snippet.res.dto';

export class SnippetsPaginatedResDto {
  data: SnippetResDto[];
  total: number;
  page: number;
  limit: number;
}
