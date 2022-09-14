import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Authenticate } from '../../auth/auth.guard';
import { TUser, User } from '../../decorators/user.decorator';
import { AddEventDto, addEventServiceDto, getServicesDto } from './client.dto';
import { ClientService } from './client.service';

@Controller()
@UseGuards(Authenticate)
export class ClientController {
  constructor(private readonly service: ClientService) {}

  @Get('event/:id')
  async getEvent(@User() user: TUser, @Param('id') id: number) {
    try {
      const res = await this.service.getEvent(user.id, id);
      return { success: true, event: res };
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('failed to get event');
    }
  }

  @Get('events')
  async getEvents(@User() user: TUser) {
    try {
      const res = await this.service.getEventsByUser(user.id);
      return { success: true, events: res };
    } catch (error) {
      throw new InternalServerErrorException('failed to get events');
    }
  }

  @Post('/event')
  @UsePipes(ValidationPipe)
  async addEvent(@Body() body: AddEventDto, @User() user: TUser) {
    try {
      const res = await this.service.addEvent(user.id, body);
      return res;
    } catch (error) {
      throw new InternalServerErrorException('error while trying to add event');
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
      throw new InternalServerErrorException('failed to update event');
    }
  }

  @Get('service-options')
  @UsePipes(ValidationPipe)
  async getServiceOptions(@Query() { date }: getServicesDto) {
    try {
      const res = await this.service.getServiceOptions(date);
      return res;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        'error while getting services data',
      );
    }
  }

  @Get('dates')
  async getDates() {
    try {
      const res = await this.service.getDates();
      return { success: true, dates: res };
    } catch (error) {
      throw new InternalServerErrorException('error while getting dates');
    }
  }

  @Post('event/service')
  @UsePipes(ValidationPipe)
  async addEventService(@User() user: TUser, @Body() body: addEventServiceDto) {
    try {
      const res = await this.service.addEventService(user.id, body);
      return { success: true, services: res };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  @Delete('event/service/:eventServiceId')
  async deleteEventService(
    @Param('eventServiceId') id: string,
    @User() user: TUser,
  ) {
    try {
      const res = await this.service.deleteEventService(user.id, Number(id));
      return res;
    } catch (error) {
      throw new InternalServerErrorException(
        'error while removing the event service',
      );
    }
  }
  @Put('event/book/:eventId')
  async bookEvent(@Param('eventId') eventId: string, @User() user: TUser) {
    const res = await this.service.bookEvent(user.id, Number(eventId));
    return res;
  }
}
