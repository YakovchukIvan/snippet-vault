import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SnippetType } from '../../enums/snippet-type.enum';

export class SnippetBaseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsEnum(SnippetType)
  @IsNotEmpty()
  type: SnippetType;
}
