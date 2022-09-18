import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Event from '../../typeorm/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PublicService {
  constructor(
    @InjectRepository(Event) private readonly eventRepo: Repository<Event>,
  ) {}

  async getEvent(eventId: number) {
    const res = await this.eventRepo.findOne({
      where: {
        id: eventId,
        status: 'booked',
      },
    });

    if (res) {
      delete res.user_id;
      return { success: true, event: res };
    }
    return new UnauthorizedException('Cant find the requested event');
  }
}
