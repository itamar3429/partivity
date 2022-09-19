import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { LocalAuthGuard } from './guard.local';
import { Authenticate } from './auth.guard';
import { TUser, User } from '../decorators/user.decorator';
import { Response as E_Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: LoginDto, @User() reqUser: TUser) {
    const { password, id, ...user } = reqUser;
    return { success: true, user };
  }

  @UseGuards(Authenticate)
  @Post('logout')
  async logout(@Request() req: Express.Request, @Response() res: E_Response) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    req.logout(() => {});
    res.json({ success: true });
  }

  @UsePipes(ValidationPipe)
  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.createUser(body);
  }

  @UseGuards(Authenticate)
  @Get()
  protected(@User() reqUser: TUser) {
    const { password, id, ...user } = reqUser as any;
    return { success: true, user };
  }
}
