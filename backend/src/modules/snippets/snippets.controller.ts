import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateSnippetDto } from './dto/req/create-snippet.req.dto';
import { UpdateSnippetDto } from './dto/req/update-snippet.req.dto';
import { SnippetsQueryDto } from './dto/req/snippets-query.req.dto';
import { SnippetResDto } from './dto/res/snippet.res.dto';
import { SnippetsPaginatedResDto } from './dto/res/snippets-paginated.res.dto';
import { toSnippetResDto } from './mappers/snippet.mapper';
import { toSnippetsPaginatedResDto } from './mappers/snippets-paginated.mapper';
import { SNIPPETS_ROUTES } from './routes/snippets.routes';
import { SnippetsService } from './snippets.service';

@ApiTags('Snippets')
@Controller(SNIPPETS_ROUTES.BASE)
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Post()
  @ApiOperation({ summary: 'Create snippet' })
  async create(@Body() dto: CreateSnippetDto): Promise<SnippetResDto> {
    const snippet = await this.snippetsService.create(dto);
    return toSnippetResDto(snippet);
  }

  @Get()
  @ApiOperation({ summary: 'Get all snippets' })
  async findAll(@Query() query: SnippetsQueryDto): Promise<SnippetsPaginatedResDto> {
    const result = await this.snippetsService.findAll(query);
    return toSnippetsPaginatedResDto(result);
  }

  @Get(SNIPPETS_ROUTES.BY_ID)
  @ApiOperation({ summary: 'Get snippet by id' })
  async findOne(@Param('id') id: string): Promise<SnippetResDto> {
    const snippet = await this.snippetsService.findOne(id);
    return toSnippetResDto(snippet);
  }

  @Patch(SNIPPETS_ROUTES.BY_ID)
  @ApiOperation({ summary: 'Update snippet' })
  async update(@Param('id') id: string, @Body() dto: UpdateSnippetDto): Promise<SnippetResDto> {
    const snippet = await this.snippetsService.update(id, dto);
    return toSnippetResDto(snippet);
  }

  @Delete(SNIPPETS_ROUTES.BY_ID)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete snippet' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.snippetsService.remove(id);
  }
}
