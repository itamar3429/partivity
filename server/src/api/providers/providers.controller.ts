import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticateProvider } from '../../auth/auth.guard';
import { addServiceDto } from './providers.dto';
import { ProvidersService } from './providers.service';

@Controller('providers')
@UseGuards(AuthenticateProvider)
export class ProvidersController {
  constructor(private readonly service: ProvidersService) {}

  @Get('services')
  async getServices(@Request() req: any) {
    const services = await this.service.getServices(req.user.id);
    return { services, success: true };
  }

  @Post('add')
  @UsePipes(ValidationPipe)
  async addService(@Body() body: addServiceDto, @Request() req: any) {
    try {
      const res = await this.service.addService(body, req.user.id);
      return { service: res, success: true };
    } catch (err) {
      return {
        success: false,
        error: err,
      };
    }
  }
}
