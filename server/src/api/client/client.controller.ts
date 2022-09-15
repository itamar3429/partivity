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
import { addEventServiceDto, getServicesDto } from './client.dto';
import { ClientService } from './client.service';

@Controller()
@UseGuards(Authenticate)
export class ClientController {
  constructor(private readonly service: ClientService) {}

  @Get('service-options')
  @UsePipes(ValidationPipe)
  async getServiceOptions(@Query() { date }: getServicesDto) {
    try {
      const res = await this.service.getServiceOptions(date);
      return res;
    } catch (error) {
      return new InternalServerErrorException('Failed to get services data');
    }
  }

  @Get('dates')
  async getDates() {
    try {
      const res = await this.service.getDates();
      return res;
    } catch (error) {
      return new InternalServerErrorException('Failed to get available dates');
    }
  }

  @Post('event/service')
  @UsePipes(ValidationPipe)
  async addEventService(@User() user: TUser, @Body() body: addEventServiceDto) {
    try {
      const res = await this.service.addEventService(user.id, body);
      return res;
    } catch (error) {
      return new InternalServerErrorException('Failed to add a service event');
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
      return new InternalServerErrorException(
        'Failed to remove the event service',
      );
    }
  }
  @Put('event/book/:eventId')
  async bookEvent(@Param('eventId') eventId: string, @User() user: TUser) {
    try {
      const res = await this.service.bookEvent(user.id, Number(eventId));
      return res;
    } catch (error) {
      return new InternalServerErrorException('Failed to book the event');
    }
  }
}
