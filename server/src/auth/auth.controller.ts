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
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import express from 'express';
import { LocalAuthGuard } from './guard.local';
import { Authenticate } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: LoginDto, @Request() req: express.Request) {
    const { password, id, ...user } = req.user as any;
    return { success: true, user };
  }

  @UsePipes(ValidationPipe)
  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.createUser(body);
  }

  @UseGuards(Authenticate)
  @Get()
  protected(@Request() req: express.Request) {
    const { password, id, ...user } = req.user as any;
    return { success: true, user };
  }
}
