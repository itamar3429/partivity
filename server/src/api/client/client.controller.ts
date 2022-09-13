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
import { Authenticate } from '../../auth/auth.guard';
import { TUser, User } from '../../decorators/user.decorator';
import { AddEventDto } from './client.dto';
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
      console.log(error);

      throw new InternalServerErrorException('error while trying to add event');
    }
  }

  @Put('event/:id')
  @UsePipes(ValidationPipe)
  updateEvent(
    @User() user: TUser,
    @Param('id') id: number,
    @Body() event: AddEventDto,
  ) {
    return this.service.updateEvent(user.id, id, event);
  }
}
