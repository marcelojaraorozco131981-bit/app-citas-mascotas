import { Pet } from './pet.model';

export interface Message {
  text: string;
  sender: 'user' | 'pet';
  timestamp: Date;
}

// A Match is a Pet with potential chat-related properties
export interface Match extends Pet {
  lastMessage?: string;
  unreadCount?: number;
  lastMessageTimestamp?: Date;
}
