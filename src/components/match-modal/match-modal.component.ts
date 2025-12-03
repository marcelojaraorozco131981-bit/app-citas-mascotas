

import { Component, ChangeDetectionStrategy, input, output, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Pet } from '../../models/pet.model';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-match-modal',
  templateUrl: './match-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class MatchModalComponent {
  private userProfileService = inject(UserProfileService);
  userPet = this.userProfileService.getUserPet();

  pet = input.required<Pet>();
  close = output<void>();
  sendMessage = output<void>();

  onClose() {
    this.close.emit();
  }

  onSendMessage() {
    this.sendMessage.emit();
  }
}
