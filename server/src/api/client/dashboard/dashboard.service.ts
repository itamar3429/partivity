import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Event from '../../../typeorm/event.entity';
import { LessThanOrEqual, MoreThan, Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Event) private readonly events: Repository<Event>,
  ) {}

  async getDashboard(userId: number) {
    const booked = await this.getBookedEvents(userId);
    const pending = await this.getPendingEvents(userId);
    const old = await this.getOldEvents(userId);
    return { success: true, booked, pending, old };
  }

  async getPendingEvents(userId: number) {
    const res = await this.events.find({
      where: {
        user_id: userId,
        status: 'pending',
      },
    });
    return res;
  }

  async getBookedEvents(userId: number) {
    const res = await this.events.find({
      where: {
        user_id: userId,
        status: 'booked',
        date: MoreThan(new Date()),
      },
    });
    return res;
  }

  async getOldEvents(userId: number) {
    const res = await this.events.find({
      where: {
        user_id: userId,
        status: 'booked',
        date: LessThanOrEqual(new Date()),
      },
    });
    return res;
  }
}
