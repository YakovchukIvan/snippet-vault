import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SnippetType } from '../enums/snippet-type.enum';

export type SnippetDocument = HydratedDocument<Snippet>;

@Schema({ timestamps: true })
export class Snippet {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ required: true, enum: SnippetType })
  type: SnippetType;

  createdAt: Date;
  updatedAt: Date;
}

export const SnippetSchema = SchemaFactory.createForClass(Snippet);

SnippetSchema.index({ title: 'text', content: 'text' });
