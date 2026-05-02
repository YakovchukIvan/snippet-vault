import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Snippet, SnippetSchema } from './schemas/snippet.schema';

import { SnippetsController } from './snippets.controller';
import { SnippetsService } from './snippets.service';
import { SnippetsRepository } from './snippets.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Snippet.name, schema: SnippetSchema }])],
  controllers: [SnippetsController],
  providers: [SnippetsService, SnippetsRepository],
})
export class SnippetsModule {}
