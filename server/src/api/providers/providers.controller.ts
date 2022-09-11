import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import ServiceSchedule from '../../typeorm/schedule.entity';
import { AuthenticateProvider } from '../../auth/auth.guard';
import {
  AddScheduleDto,
  addServiceDto,
  EditScheduleDto,
} from './providers.dto';
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

  @Get('service/:id')
  async getService(@Request() req: any, @Param('id') id: number) {
    const service = await this.service.getService(req.user.id, id);
    if (service) return { service, success: true };
    return { success: false, message: 'service not found' };
  }

  @Put('service/:id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  async updateService(
    @Request() req: any,
    @Param('id') id: number,
    @Body() body: addServiceDto,
  ) {
    const updated = await this.service.updateService(req.user.id, id, body);
    if (updated.affected)
      return { success: true, message: 'service updated successfully' };

    return { success: false, message: 'service cant be updated' };
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

  @Get('service/images/:id')
  async getServiceImages(@Param('id') serviceId: number) {
    const images = await this.service.getServiceImages(serviceId);
    return { success: true, images };
  }

  @Post('service/image/:id')
  @UseInterceptors(FileInterceptor('file'))
  async addServiceImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const dbRes = await this.service.addImageToDB(
        file.originalname,
        Number(id),
        this.service.getExtension(file.originalname),
      );
      await this.service.insertObj(dbRes.uuid, file.buffer);
      return {
        success: true,
        message: 'file uploaded successfully',
        objId: dbRes.uuid,
        imageId: dbRes.imageId,
      };
    } catch (err) {
      throw new HttpException(
        {
          success: false,
          message: 'error while trying to upload image: ' + err?.code,
        },
        500,
      );
    }
  }

  @Delete('service/:id')
  deleteService(@Request() req: any, @Param('id') serviceId: number) {
    return this.service.deleteService(serviceId, req.user.id);
  }

  @Delete('image/delete/:id')
  deleteImage(@Request() req: any, @Param('id') imgId: string) {
    return this.service.deleteImage(
      Number(imgId),
      Number(req.user.id),
      req.user.role === 'admin',
    );
  }

  @Get('schedule/:service_id')
  getSchedule(@Request() req: any, @Param('service_id') serviceId: number) {
    const userId = req.user.id;
    return this.service.getSchedule(userId, serviceId);
  }

  @Post('schedule/:service_id')
  async addSchedule(
    @Request() req: any,
    @Param('service_id') serviceId: number,
    @Body() schedules: AddScheduleDto[],
  ) {
    const userId = req.user.id;
    const res = await this.service.addSchedules(userId, serviceId, schedules);
    return res;
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  @Put('schedule/:id')
  async updateSchedule(
    @Request() req: any,
    @Param('id') id: number,
    @Body() schedule: EditScheduleDto,
  ) {
    const userId = req.user.id;
    const res = await this.service.updateSchedule(userId, id, schedule);
    return res;
  }

  @Delete('schedule/:id')
  async deleteSchedule(@Request() req: any, @Param('id') id: number) {
    const userId = req.user.id;
    const res = await this.service.deleteSchedule(userId, id);
    return res;
  }
}
