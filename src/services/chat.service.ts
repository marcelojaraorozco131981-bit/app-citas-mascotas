
import { Injectable, signal, computed } from '@angular/core';
import { Pet } from '../models/pet.model';
import { Match, Message } from '../models/chat.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private matches = signal<Match[]>([]);
  private messages = signal<Map<number, Message[]>>(new Map());

  // Public signal derived from matches and messages
  matchesWithLastMessage = computed(() => {
    const msgs = this.messages();
    return this.matches()
      .map((match) => {
        const matchMessages = msgs.get(match.id);
        if (matchMessages && matchMessages.length > 0) {
          const lastMsg = matchMessages[matchMessages.length - 1];
          return {
            ...match,
            lastMessage: lastMsg.text,
            lastMessageTimestamp: lastMsg.timestamp,
          };
        }
        return match;
      })
      .sort(
        (a, b) =>
          (b.lastMessageTimestamp?.getTime() || 0) -
          (a.lastMessageTimestamp?.getTime() || 0)
      );
  });

  addMatch(pet: Pet) {
    // Avoid adding duplicate matches
    if (!this.matches().some((m) => m.id === pet.id)) {
      this.matches.update((current) => [...current, { ...pet }]);
    }
  }

  getMessagesForMatch(petId: number) {
    return computed(() => this.messages().get(petId) || []);
  }

  sendMessage(petId: number, text: string) {
    const newMessage: Message = { text, sender: 'user', timestamp: new Date() };

    // FIX: Explicitly type `currentMessages` to resolve a type inference issue with signals containing a Map.
    this.messages.update((currentMessages: Map<number, Message[]>) => {
      const newMap = new Map(currentMessages);
      const currentChat = newMap.get(petId) || [];
      newMap.set(petId, [...currentChat, newMessage]);
      return newMap;
    });

    // Simulate a reply after a short delay
    setTimeout(
      () => this.simulateReply(petId),
      1000 + Math.random() * 1000
    );
  }

  private simulateReply(petId: number) {
    const replies = [
      'Guau guau!',
      '¿Quieres ir al parque?',
      '¡Tengo un juguete nuevo!',
      'Miau.',
      'Ronroneando...',
      '¿Tienes snacks?',
      '¡Me encanta hacer amigos nuevos!',
    ];
    const replyText = replies[Math.floor(Math.random() * replies.length)];
    const replyMessage: Message = {
      text: replyText,
      sender: 'pet',
      timestamp: new Date(),
    };

    // FIX: Explicitly type `currentMessages` to resolve a type inference issue with signals containing a Map.
    this.messages.update((currentMessages: Map<number, Message[]>) => {
      const newMap = new Map(currentMessages);
      const currentChat = newMap.get(petId) || [];
      newMap.set(petId, [...currentChat, replyMessage]);
      return newMap;
    });
  }
}
