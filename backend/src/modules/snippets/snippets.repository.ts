import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Snippet, SnippetDocument } from './schemas/snippet.schema';
import { CreateSnippetDto } from './dto/req/create-snippet.req.dto';
import { ISnippetsParsedQuery } from './interfaces/snippet.interfaces';
import { UpdateSnippetDto } from './dto/req/update-snippet.req.dto';

@Injectable()
export class SnippetsRepository {
  constructor(
    @InjectModel(Snippet.name)
    private readonly snippetModel: Model<SnippetDocument>,
  ) {}

  async create(dto: CreateSnippetDto): Promise<SnippetDocument> {
    return this.snippetModel.create(dto);
  }

  async findAll(query: ISnippetsParsedQuery): Promise<{ data: SnippetDocument[]; total: number }> {
    const { page, limit, q, tag } = query;
    const skip = (page - 1) * limit;
    const filter: Record<string, unknown> = {};

    if (tag) {
      filter['tags'] = tag;
    }

    if (q) {
      filter['$text'] = { $search: q };
    }

    const [data, total] = await Promise.all([
      this.snippetModel.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
      this.snippetModel.countDocuments(filter),
    ]);

    return { data, total };
  }

  async findById(id: string): Promise<SnippetDocument | null> {
    return this.snippetModel.findById(id);
  }

  async update(id: string, dto: UpdateSnippetDto): Promise<SnippetDocument | null> {
    return this.snippetModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async remove(id: string): Promise<SnippetDocument | null> {
    return this.snippetModel.findByIdAndDelete(id);
  }
}
