import { Controller, Get, Post, Patch, Param, Body, Query, Req } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async create(@Body() dto) {
    return this.notificationsService.create(dto);
  }

  @Get()
  async list(@Req() req, @Query('unread') unread: string) {
    return this.notificationsService.list(req.user.id, unread === 'true');
  }

  @Patch(':id/read')
  async markRead(@Param('id') id: string) {
    return this.notificationsService.markRead(id);
  }

  @Patch('read-all')
  async markAllRead(@Req() req) {
    return this.notificationsService.markAllRead(req.user.id);
  }
}
