import { SnippetsPaginatedResDto } from '../dto/res/snippets-paginated.res.dto';
import { toSnippetResDto } from './snippet.mapper';
import { SnippetsService } from '../snippets.service';

type FindAllResult = Awaited<ReturnType<SnippetsService['findAll']>>;

export function toSnippetsPaginatedResDto(result: FindAllResult): SnippetsPaginatedResDto {
  return {
    data: result.data.map(toSnippetResDto),
    total: result.total,
    page: result.page,
    limit: result.limit,
  };
}
