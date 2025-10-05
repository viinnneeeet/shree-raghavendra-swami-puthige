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

export interface EventState {
  date: string;
  title: string;
  type: EventType | null;
  time: string;
  location: string;
  attendees: string;
  description: string;
  image_url: string;
  src: File | null;
  participants: string;
  [key: string]: unknown;
}

export interface EventPayload {
  date: string;
  title: string;
  type: EventType | null;
  time: string;
  location: string;
  attendees: string;
  description: string;
  image_url: string;
  participants: string;
  [key: string]: unknown;
}
