import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Put,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { AuthenticateProvider } from '../../../auth/auth.guard';
import { TUser, User } from '../../../decorators/user.decorator';
import { addServiceDto } from './service.dto';
import { ServicesService } from './services.service';

@Controller('providers')
@UseGuards(AuthenticateProvider)
export class ServicesController {
  constructor(private readonly service: ServicesService) {}

  @Get('services')
  async getServices(@User() user: TUser) {
    try {
      const res = await this.service.getServices(user.id);
      return res;
    } catch (error) {
      return new InternalServerErrorException('Error: Failed to get services');
    }
  }

  @Get('service/:id')
  async getService(@User() user: TUser, @Param('id') id: number) {
    try {
      const service = await this.service.getService(user.id, id);
      return service;
    } catch (error) {
      console.log(error);

      return new InternalServerErrorException(
        'Failed to get the service details',
      );
    }
  }

  @Put('service/:id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  async updateService(
    @User() user: TUser,
    @Param('id') id: number,
    @Body() body: addServiceDto,
  ) {
    try {
      const res = await this.service.updateService(user.id, id, body);
      return res;
    } catch (error) {
      return new InternalServerErrorException('Failed to update the service.');
    }
  }

  @Post('service')
  @UsePipes(ValidationPipe)
  async addService(@Body() body: addServiceDto, @User() user: TUser) {
    try {
      const res = await this.service.addService(body, user.id);
      return res;
    } catch (err) {
      return new InternalServerErrorException('Failed to create the service.');
    }
  }

  @Delete('service/:id')
  async deleteService(@User() user: TUser, @Param('id') serviceId: number) {
    try {
      const res = await this.service.deleteService(serviceId, user.id);
      return res;
    } catch (error) {
      return new InternalServerErrorException('Failed to delete the service.');
    }
  }
}
