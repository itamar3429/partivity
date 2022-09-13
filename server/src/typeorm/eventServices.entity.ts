import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import EventPlan from './event.entity';
import ServiceSchedule from './schedule.entity';

const NAME = 'event_services' as const;

@Entity({ name: NAME })
class EventServices {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EventPlan, (event) => event.id, { cascade: true })
  @JoinColumn({ name: 'event_id' })
  event_id: number;

  //   @ManyToOne(() => Service, (service) => service.id, { cascade: true })
  //   @JoinColumn({ name: 'service_id' })
  //   service_id: number;

  @ManyToOne(() => ServiceSchedule, (schedule) => schedule.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'schedule_id' })
  schedule_id: number;

  static getName() {
    return NAME;
  }
}

export default EventServices;
