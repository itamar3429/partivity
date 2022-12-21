import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Event from '../../../typeorm/event.entity';
import EventServices from '../../../typeorm/eventServices.entity';
import ServiceSchedule from '../../../typeorm/schedule.entity';
import Service from '../../../typeorm/services.entity';
import { In, Repository } from 'typeorm';
import { AddEventDto } from './events.dto';
import ServiceImages from '../../../typeorm/images.entity';

const N_EVENTS = Event.getName();
const N_EVENT_S = EventServices.getName();
const N_SCHEDULE = ServiceSchedule.getName();
const N_SERVICES = Service.getName();
const N_IMAGES = ServiceImages.getName();

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly events: Repository<Event>,
    @InjectRepository(EventServices)
    private readonly eventServices: Repository<EventServices>,
  ) {}

  async getEventsByUser(userId: number) {
    const events = await this.events.findBy({ user_id: userId });
    if (events.length) {
      const eventIds = events.map((e) => e.id);

      const services = await this.getEventServices(eventIds, userId);

      const res = (events as (Event & { services: EventServices[] })[]).map(
        (e) => {
          e.services = services.filter((s) => (s.event_id = e.id));

          return e;
        },
      );

      return { success: true, events: res };
    }
    return { success: true, events: [] };
  }

  async getEvent(userId: number, eventId: number) {
    const event = await this.events.findOne({
      where: {
        id: eventId,
        user_id: userId,
      },
    });

    if (event) {
      const services = await this.getEventServices([event.id], userId);

      const res = { ...event, services };
      return { success: true, event: res };
    } else
      return new UnauthorizedException('User not allowed to get this event');
  }

  private async getEventServices(eventIds: number[], userId: number) {
    const res = await this.eventServices
      .createQueryBuilder(N_EVENT_S)
      .select([
        `${N_EVENT_S}.*`,
        `${N_EVENT_S}.id AS event_service_id`,
        `${N_SCHEDULE}.*`,
        `${N_SCHEDULE}.title AS schedule_title`,
        `${N_SERVICES}.*`,
        `${N_SERVICES}.title AS service_title`,
        `ARRAY_AGG(obj_id) AS images`,
      ])
      .leftJoin(
        ServiceSchedule,
        N_SCHEDULE,
        `${N_SCHEDULE}.id = ${N_EVENT_S}.schedule_id`,
      )
      .leftJoin(
        Service,
        N_SERVICES,
        `${N_SERVICES}.id = ${N_SCHEDULE}.service_id`,
      )
      .leftJoin(
        ServiceImages,
        N_IMAGES,
        `${N_SERVICES}.id = ${N_IMAGES}.service_id`,
      )
      .where({
        event_id: In(eventIds),
        user_id: userId,
      })
      .groupBy(`${N_EVENT_S}.id, ${N_SERVICES}.id, ${N_SCHEDULE}.id `)
      .getRawMany();

    return res;
  }

  async addEvent(userId: number, event: AddEventDto) {
    const res = await this.events.save({
      description: event.description,
      name: event.name,
      status: 'pending',
      title: event.title,
      user_id: userId,
      date: new Date(event.date),
    });
    delete res.user_id;
    return { success: true, event: res };
  }

  async updateEvent(userId: number, eventId: number, event: AddEventDto) {
    const res = await this.events.update(
      {
        user_id: userId,
        id: eventId,
      },
      {
        description: event.description,
        name: event.name,
        status: 'pending',
        title: event.title,
        user_id: userId,
        date: new Date(event.date),
      },
    );
    const success = !!res.affected;
    return {
      success: success,
      message: success
        ? 'Event updated successfully'
        : 'Failed to update event',
    };
  }

  async getEventsByUserOld(userId: number) {
    return this.events.query(
      `
  SELECT ${N_EVENTS}.*, 
  ARRAY_AGG(JSON_OBJECT_AGG(
	 'id', ${N_EVENT_S}.id,
	 'event_id',${N_EVENT_S}.event_id,
	 'service_id',${N_EVENT_S}.service_id
	 )) as event_services
	from ${N_EVENTS} 
  LEFT JOIN ${N_EVENT_S} ON event_id = ${N_EVENTS}.id
  WHERE user_id = $1
  GROUP BY ${N_EVENTS}.id
  `,
      [userId],
    );
  }

  async getEventOld(userId: number, eventId: number) {
    return this.events.query(
      `
	  SELECT ${N_EVENTS}.*, 
	  ARRAY_AGG(JSON_OBJECT_AGG(
		 'id', ${N_EVENT_S}.id,
		 'event_id',${N_EVENT_S}.event_id,
		 'service_id',${N_EVENT_S}.service_id
		 )) as event_services
		from ${N_EVENTS} 
	  LEFT JOIN ${N_EVENT_S} ON event_id = ${N_EVENTS}.id
	  WHERE user_id = $1
	  AND ${N_EVENTS}.id = $2
	  GROUP BY ${N_EVENTS}.id
	`,
      [userId, eventId],
    );
  }
}
