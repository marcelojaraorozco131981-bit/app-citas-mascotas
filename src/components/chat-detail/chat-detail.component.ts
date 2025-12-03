import { Component, ChangeDetectionStrategy, ElementRef, ViewChild, AfterViewChecked, inject, input, output, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { Pet } from '../../models/pet.model';
import { ChatService } from '../../services/chat.service';
import { Match } from '../../models/chat.model';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  imports: [ReactiveFormsModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatDetailComponent implements AfterViewChecked {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  
  private chatService = inject(ChatService);

  pet = input.required<Match>();
  
  messages = computed(() => {
    const p = this.pet();
    return p ? this.chatService.getMessagesForMatch(p.id)() : [];
  });

  messageControl = new FormControl('', { nonNullable: true, validators: [Validators.required] });

  close = output<void>();
  
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage() {
    if (this.messageControl.invalid) return;
    const text = this.messageControl.value.trim();
    if (text) {
      this.chatService.sendMessage(this.pet().id, text);
      this.messageControl.reset();
    }
  }

  onClose() {
    this.close.emit();
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) { /* surpress error */ }
  }
}
