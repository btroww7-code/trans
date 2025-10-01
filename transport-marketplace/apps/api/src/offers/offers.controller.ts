import { Controller, Post, Get, Delete, Param, Body, Query } from '@nestjs/common';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  async create(@Body() dto) {
    return this.offersService.create(dto);
  }

  @Get()
  async list(@Query('listing_id') listing_id: string, @Query('carrier_id') carrier_id: string) {
    return this.offersService.list({ listing_id, carrier_id });
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.offersService.getById(id);
  }

  @Post(':id/accept')
  async accept(@Param('id') id: string) {
    return this.offersService.accept(id);
  }

  @Post(':id/reject')
  async reject(@Param('id') id: string) {
    return this.offersService.reject(id);
  }

  @Delete(':id')
  async withdraw(@Param('id') id: string) {
    return this.offersService.withdraw(id);
  }
}
