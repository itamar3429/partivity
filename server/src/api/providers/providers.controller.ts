import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Query,
  Request,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { raw } from 'express';
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

  @Delete('image/delete/:id')
  deleteImage(@Request() req: any, @Param('id') imgId: string) {
    return this.service.deleteImage(
      Number(imgId),
      Number(req.user.id),
      req.user.role === 'admin',
    );
  }
}
