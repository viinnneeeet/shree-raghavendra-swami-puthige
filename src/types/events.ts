export type EventType = 'Festival' | 'Retreat' | 'Service' | 'Special';

export interface TempleEvent {
  date: string;
  title: string;
  type: EventType;
  time: string;
  location: string;
  attendees: number;
  description: string;
}
