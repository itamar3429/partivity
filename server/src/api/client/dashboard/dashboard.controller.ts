import { Controller, Get, UseGuards } from '@nestjs/common';
import { TUser, User } from '../../../decorators/user.decorator';
import { Authenticate } from '../../../auth/auth.guard';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@UseGuards(Authenticate)
export class DashboardController {
  constructor(private readonly service: DashboardService) {}

  @Get()
  async getDashboard(@User() user: TUser) {
    const res = await this.service.getDashboard(user.id);
    return res;
  }
}
