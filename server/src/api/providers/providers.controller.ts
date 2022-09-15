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
import { addServiceDto } from './providers.dto';
import { ProvidersService } from './providers.service';
import { TUser, User } from '../../decorators/user.decorator';

@Controller('providers')
@UseGuards(AuthenticateProvider)
export class ProvidersController {
  constructor(private readonly service: ProvidersService) {}

  @Get('service/images/:id')
  async getServiceImages(@Param('id') serviceId: number, @User() user: TUser) {
    try {
      const res = await this.service.getServiceImages(user.id, serviceId);
      return res;
    } catch (error) {
      return new InternalServerErrorException(
        'Failed to retrieve service images',
      );
    }
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
      return new InternalServerErrorException(
        'Failed to switch service primary image',
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
      const res = this.service.addImage(user.id, Number(id), file);
      return res;
    } catch (error) {
      return new InternalServerErrorException(
        `Failed to upload and save image`,
      );
    }
  }

  @Delete('image/delete/:id')
  async deleteImage(@User() user: TUser, @Param('id') imgId: string) {
    try {
      const res = await this.service.deleteImage(
        Number(imgId),
        Number(user.id),
        user.role === 'admin',
      );
      return res;
    } catch (error) {
      return new InternalServerErrorException(
        'error while trying to delete image',
      );
    }
  }
}
