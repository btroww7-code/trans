import { Controller, Post, Patch, Get, Param, Body, Query } from '@nestjs/common';
import { ListingsService } from './listings.service';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post()
  async createDraft(@Body() dto) {
    return this.listingsService.createDraft(dto);
  }

  @Patch(':id')
  async updateDraft(@Param('id') id: string, @Body() dto) {
    return this.listingsService.updateDraft(id, dto);
  }

  @Post(':id/publish')
  async publish(@Param('id') id: string) {
    return this.listingsService.publish(id);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.listingsService.getById(id);
  }

  @Get()
  async list(
    @Query('category') category: string,
    @Query('from_city') from_city: string,
    @Query('to_city') to_city: string,
    @Query('sort') sort: string = 'created_at',
    @Query('order') order: string = 'desc',
    @Query('page') page: number = 1,
    @Query('size') size: number = 40
  ) {
    return this.listingsService.list({
      category,
      from_city,
      to_city,
      sort,
      order,
      page,
      size,
    });
  }
}
