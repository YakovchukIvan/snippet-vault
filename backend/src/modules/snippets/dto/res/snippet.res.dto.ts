import { SnippetType } from '../../enums/snippet-type.enum';

export class SnippetResDto {
  id: string;
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
  createdAt: Date;
  updatedAt: Date;
}
