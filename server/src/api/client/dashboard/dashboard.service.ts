import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Event from '../../../typeorm/event.entity';
import { LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import Service from '../../../typeorm/services.entity';
import ServiceSchedule from '../../../typeorm/schedule.entity';
import ServiceImages from '../../../typeorm/images.entity';

const N_EVENTS = Event.getName();
const N_SERVICES = Service.getName();
const N_SCHEDULE = ServiceSchedule.getName();
const N_IMAGES = ServiceImages.getName();

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
