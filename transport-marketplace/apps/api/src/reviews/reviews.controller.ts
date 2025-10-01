import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(@Body() dto) {
    return this.reviewsService.create(dto);
  }

  @Get()
  async list(@Query('user_id') user_id: string) {
    return this.reviewsService.list(user_id);
  }

  @Post(':id/respond')
  async respond(@Param('id') id: string, @Body() dto) {
    return this.reviewsService.respond(id, dto.response);
  }
}
