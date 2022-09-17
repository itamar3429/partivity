import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TUser, User } from '../../../decorators/user.decorator';
import { ScheduleService } from './schedule.service';
import { AddScheduleDto, EditScheduleDto } from './schedule.dto';
import { AuthenticateProvider } from '../../../auth/auth.guard';

@Controller('providers/schedule')
@UseGuards(AuthenticateProvider)
export class ScheduleController {
  constructor(private readonly service: ScheduleService) {}

  @Get('upcoming')
  async getUpcomingEvents(@User() user: TUser) {
    try {
      const res = await this.service.getUpcomingEvents(user.id);
      return res;
    } catch (error) {
      return new InternalServerErrorException(
        'Failed to retrieve upcoming events',
      );
    }
  }

  @Get(':service_id')
  async getSchedule(
    @User() user: TUser,
    @Param('service_id') serviceId: number,
  ) {
    const userId = user.id;
    try {
      return await this.service.getSchedule(userId, serviceId);
    } catch (error) {
      return new InternalServerErrorException(
        'error while trying to get service schedule',
      );
    }
  }

  @Post(':service_id')
  async addSchedule(
    @User() user: TUser,
    @Param('service_id') serviceId: number,
    @Body() schedules: AddScheduleDto[],
  ) {
    const userId = user.id;
    try {
      const res = await this.service.addSchedules(userId, serviceId, schedules);
      return res;
    } catch (error) {
      return new InternalServerErrorException(
        'error while trying to add service schedule',
      );
    }
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  @Put(':id')
  async updateSchedule(
    @User() user: TUser,
    @Param('id') id: number,
    @Body() schedule: EditScheduleDto,
  ) {
    const userId = user.id;
    try {
      const res = await this.service.updateSchedule(userId, id, schedule);
      return res;
    } catch (error) {
      return new InternalServerErrorException(
        'error while trying to update service schedule',
      );
    }
  }

  @Delete(':id')
  async deleteSchedule(@User() user: TUser, @Param('id') id: number) {
    const userId = user.id;
    try {
      const res = await this.service.deleteSchedule(userId, id);
      return res;
    } catch (error) {
      return new InternalServerErrorException(
        'error while trying to remove service schedule',
      );
    }
  }
}
