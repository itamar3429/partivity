import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ExpressAdapter, FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  //   @Post('file')
  //   @UseInterceptors(FileInterceptor('file'))
  //   postFile(@UploadedFile() file: Express.Multer.File) {
  //     console.log(file);
  //   }
}
