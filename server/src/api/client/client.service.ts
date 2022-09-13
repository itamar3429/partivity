import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Events from '../../typeorm/event.entity';
import { In, Repository } from 'typeorm';
import EventServices from '../../typeorm/eventServices.entity';
import EventPlan from '../../typeorm/event.entity';
import { AddEventDto } from './client.dto';

const N_EVENTS = Events.getName();
const N_EVENT_S = EventServices.getName();

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Events)
    private readonly events: Repository<Events>,
    @InjectRepository(EventServices)
    private readonly eventServices: Repository<EventServices>,
  ) {}

  async getEventsByUser(userId: number) {
    const events = await this.events.findBy({ user_id: userId });
    if (events.length) {
      const services = await this.eventServices.find({
        where: {
          event_id: In(events.map((e) => e.id)),
        },
      });

      const res = (events as (EventPlan & { services: EventServices[] })[]).map(
        (e) => {
          e.services = services.filter((s) => (s.event_id = e.id));

          return e;
        },
      );

      return res;
    }
    return [];
  }

  async getEvent(userId: number, eventId: number) {
    const event = await this.events.findOne({
      where: {
        id: eventId,
        user_id: userId,
      },
    });

    if (event) {
      const services = await this.eventServices.findBy({
        event_id: event.id,
      });

      return { ...event, services };
    } else throw new UnauthorizedException();
  }

  async getEventServices(eventIds: number[]) {
    const res = await this.eventServices.find({
      where: {
        id: In(eventIds),
      },
      relations: {
        event_id: true,
        schedule_id: true,
      },
    });
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
    return { success: !!res.affected };
  }

  async getEventsByUserOld(userId: number) {
    return this.events.query(
      `
	SELECT ${N_EVENTS}.*, 
	JSON_ARRAYAGG(JSON_OBJECT(
	  'id', ${N_EVENT_S}.id,
	  'event_id',${N_EVENT_S}.event_id,
	  'service_id',${N_EVENT_S}.service_id
	  )) as event_services
	 from ${N_EVENTS} 
	LEFT JOIN ${N_EVENT_S} ON event_id = ${N_EVENTS}.id
	WHERE user_id = ?
	GROUP BY ${N_EVENTS}.id
	`,
      [userId],
    );
  }

  async getEventOld(userId: number, eventId: number) {
    return this.events.query(
      `
		SELECT ${N_EVENTS}.*, 
		JSON_ARRAYAGG(JSON_OBJECT(
		  'id', ${N_EVENT_S}.id,
		  'event_id',${N_EVENT_S}.event_id,
		  'service_id',${N_EVENT_S}.service_id
		  )) as event_services
		 from ${N_EVENTS} 
		LEFT JOIN ${N_EVENT_S} ON event_id = ${N_EVENTS}.id
		WHERE user_id = ?
		AND ${N_EVENTS}.id = ?
		GROUP BY ${N_EVENTS}.id
	 `,
      [userId, eventId],
    );
  }
}
