import { SnippetDocument } from '../schemas/snippet.schema';
import { SnippetResDto } from '../dto/res/snippet.res.dto';

export function toSnippetResDto(doc: SnippetDocument): SnippetResDto {
  return {
    id: doc._id.toString(),
    title: doc.title,
    content: doc.content,
    tags: doc.tags,
    type: doc.type,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}
