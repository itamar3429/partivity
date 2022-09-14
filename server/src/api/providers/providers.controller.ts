import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Put,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthenticateProvider } from '../../auth/auth.guard';
import {
  AddScheduleDto,
  addServiceDto,
  EditScheduleDto,
} from './providers.dto';
import { ProvidersService } from './providers.service';
import { TUser, User } from '../../decorators/user.decorator';

@Controller('providers')
@UseGuards(AuthenticateProvider)
export class ProvidersController {
  constructor(private readonly service: ProvidersService) {}

  @Get('services')
  async getServices(@User() user: TUser) {
    const services = await this.service.getServices(user.id);
    return { services, success: true };
  }

  @Get('service/:id')
  async getService(@User() user: TUser, @Param('id') id: number) {
    const service = await this.service.getService(user.id, id);
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
    @User() user: TUser,
    @Param('id') id: number,
    @Body() body: addServiceDto,
  ) {
    const updated = await this.service.updateService(user.id, id, body);
    if (updated.affected)
      return { success: true, message: 'service updated successfully' };

    return { success: false, message: 'service cant be updated' };
  }

  @Post('add')
  @UsePipes(ValidationPipe)
  async addService(@Body() body: addServiceDto, @User() user: TUser) {
    try {
      const res = await this.service.addService(body, user.id);
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

  @Put('primary/image/:serviceId/:imageId')
  async makePrimaryImage(
    @Param('imageId') imageId: string,
    @Param('serviceId') serviceId: string,
    @User() user: TUser,
  ) {
    try {
      const res = await this.service.changePrimaryImage(
        user.id,
        Number(imageId),
        Number(serviceId),
      );
      return res;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        'error while switching primary image',
      );
    }
  }

  @Post('service/image/:id')
  @UseInterceptors(FileInterceptor('file'))
  async addServiceImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @User() user: TUser,
  ) {
    try {
      const isOwner = await this.service.isServiceOwner(user.id, Number(id));
      if (isOwner) {
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
          primary: dbRes.primary,
        };
      } else {
        throw new UnauthorizedException('user not allowed to post this image');
      }
    } catch (err) {
      console.log(err);

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
  deleteService(@User() user: TUser, @Param('id') serviceId: number) {
    return this.service.deleteService(serviceId, user.id);
  }

  @Delete('image/delete/:id')
  async deleteImage(@User() user: TUser, @Param('id') imgId: string) {
    return await this.service.deleteImage(
      Number(imgId),
      Number(user.id),
      user.role === 'admin',
    );
  }

  @Get('schedule/:service_id')
  getSchedule(@User() user: TUser, @Param('service_id') serviceId: number) {
    const userId = user.id;
    return this.service.getSchedule(userId, serviceId);
  }

  @Post('schedule/:service_id')
  async addSchedule(
    @User() user: TUser,
    @Param('service_id') serviceId: number,
    @Body() schedules: AddScheduleDto[],
  ) {
    const userId = user.id;
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
    @User() user: TUser,
    @Param('id') id: number,
    @Body() schedule: EditScheduleDto,
  ) {
    const userId = user.id;
    const res = await this.service.updateSchedule(userId, id, schedule);
    return res;
  }

  @Delete('schedule/:id')
  async deleteSchedule(@User() user: TUser, @Param('id') id: number) {
    const userId = user.id;
    const res = await this.service.deleteSchedule(userId, id);
    return res;
  }
}
