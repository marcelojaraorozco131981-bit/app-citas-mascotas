import { Component, ChangeDetectionStrategy, output, inject } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { Match } from '../../models/chat.model';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  imports: [NgOptimizedImage, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatListComponent {
  private chatService = inject(ChatService);

  matches = this.chatService.matchesWithLastMessage;

  close = output<void>();
  selectChat = output<Match>();

  onClose() {
    this.close.emit();
  }

  onSelectChat(match: Match) {
    this.selectChat.emit(match);
  }
}
