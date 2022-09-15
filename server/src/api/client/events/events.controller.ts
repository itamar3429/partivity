import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Authenticate } from '../../../auth/auth.guard';
import { TUser, User } from '../../../decorators/user.decorator';
import { AddEventDto } from './events.dto';
import { EventsService } from './events.service';

@Controller()
@UseGuards(Authenticate)
export class EventsController {
  constructor(private readonly service: EventsService) {}

  @Get('event/:id')
  async getEvent(@User() user: TUser, @Param('id') id: number) {
    try {
      const res = await this.service.getEvent(user.id, id);
      return res;
    } catch (error) {
      return new InternalServerErrorException('Failed to get event');
    }
  }

  @Get('events')
  async getEvents(@User() user: TUser) {
    try {
      const res = await this.service.getEventsByUser(user.id);
      return res;
    } catch (error) {
      return new InternalServerErrorException('Failed to get events');
    }
  }

  @Post('/event')
  @UsePipes(ValidationPipe)
  async addEvent(@Body() body: AddEventDto, @User() user: TUser) {
    try {
      const res = await this.service.addEvent(user.id, body);
      return res;
    } catch (error) {
      return new InternalServerErrorException('Failed to create event');
    }
  }

  @Put('event/:id')
  @UsePipes(ValidationPipe)
  async updateEvent(
    @User() user: TUser,
    @Param('id') id: number,
    @Body() event: AddEventDto,
  ) {
    try {
      return await this.service.updateEvent(user.id, id, event);
    } catch (error) {
      return new InternalServerErrorException('Failed to update event');
    }
  }
}
