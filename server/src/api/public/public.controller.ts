import { Controller, Get, Param } from '@nestjs/common';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
  constructor(private readonly service: PublicService) {}

  @Get('invite/:eventId')
  async loadInvitePage(@Param('eventId') eventId: string) {
    const res = await this.service.getEvent(Number(eventId));
    return res;
  }
}
