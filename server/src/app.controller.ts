import {
  Controller,
  Get,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  test() {
    try {
      return new UnauthorizedException();
    } catch (error) {
      return new InternalServerErrorException();
    }
  }
}
