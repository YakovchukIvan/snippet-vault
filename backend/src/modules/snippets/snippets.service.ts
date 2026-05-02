import { Injectable, NotFoundException } from '@nestjs/common';

import { SnippetsRepository } from './snippets.repository';
import { CreateSnippetDto } from './dto/req/create-snippet.req.dto';
import { SnippetDocument } from './schemas/snippet.schema';
import { SnippetsQueryDto } from './dto/req/snippets-query.req.dto';
import { UpdateSnippetDto } from './dto/req/update-snippet.req.dto';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

@Injectable()
export class SnippetsService {
  constructor(private readonly snippetsRepository: SnippetsRepository) {}

  async create(dto: CreateSnippetDto): Promise<SnippetDocument> {
    return this.snippetsRepository.create(dto);
  }

  async findAll(query: SnippetsQueryDto): Promise<{
    data: SnippetDocument[];
    total: number;
    page: number;
    limit: number;
  }> {
    const page = Number(query.page ?? DEFAULT_PAGE);
    const limit = Number(query.limit ?? DEFAULT_LIMIT);

    const { data, total } = await this.snippetsRepository.findAll({
      page,
      limit,
      q: query.q,
      tag: query.tag,
    });

    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<SnippetDocument> {
    const snippet = await this.snippetsRepository.findById(id);
    if (!snippet) {
      throw new NotFoundException(`Snippet with id ${id} not found`);
    }
    return snippet;
  }

  async update(id: string, dto: UpdateSnippetDto): Promise<SnippetDocument> {
    const snippet = await this.snippetsRepository.update(id, dto);
    if (!snippet) {
      throw new NotFoundException(`Snippet with id ${id} not found`);
    }
    return snippet;
  }

  async remove(id: string): Promise<void> {
    const snippet = await this.snippetsRepository.remove(id);
    if (!snippet) {
      throw new NotFoundException(`Snippet with id ${id} not found`);
    }
  }
}
