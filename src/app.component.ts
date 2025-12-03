

import { Component, ChangeDetectionStrategy, signal, inject, computed, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { PetCardComponent } from './components/pet-card/pet-card.component';
import { MatchModalComponent } from './components/match-modal/match-modal.component';
import { PetService } from './services/pet.service';
import { Pet } from './models/pet.model';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileService } from './services/user-profile.service';
import { ChatService } from './services/chat.service';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatDetailComponent } from './components/chat-detail/chat-detail.component';
import { Match } from './models/chat.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PetCardComponent,
    MatchModalComponent,
    NgOptimizedImage,
    UserProfileComponent,
    ChatListComponent,
    ChatDetailComponent,
  ],
})
export class AppComponent implements OnInit {
  private petService = inject(PetService);
  private userProfileService = inject(UserProfileService);
  private chatService = inject(ChatService);

  // View management
  view = signal<'swiping' | 'chatList' | 'chatDetail'>('swiping');
  activeChatPet = signal<Match | undefined>(undefined);

  pets = signal<Pet[]>([]);
  lastMatch = signal<Pet | undefined>(undefined);
  
  isProfileOpen = signal(false);
  userPet = this.userProfileService.getUserPet();

  // A predefined set of pets that will "like" the user back to simulate a match
  private petsThatLikeUser = new Set([2, 5, 8]);
  private swipedPetIds = new Set<number>();
  
  swipeDirection = signal<'left' | 'right' | null>(null);
  isSwiping = signal(false);

  currentPet = computed<Pet | undefined>(() => this.pets()[0]);
  nextPet = computed<Pet | undefined>(() => this.pets()[1]);
  
  swipeClass = computed(() => {
    const direction = this.swipeDirection();
    if (!direction) return '';
    return direction === 'left' ? 'swipe-out-left' : 'swipe-out-right';
  });

  ngOnInit() {
    this.pets.set(this.petService.getPets());
  }

  swipe(direction: 'left' | 'right'): void {
    if (this.isSwiping() || !this.currentPet()) return;

    this.isSwiping.set(true);
    this.swipeDirection.set(direction);

    const swipedPet = this.currentPet()!;

    if (direction === 'right') {
      this.handleLike(swipedPet);
    }
    
    this.swipedPetIds.add(swipedPet.id);

    // Wait for animation to finish before removing the pet from the stack
    setTimeout(() => {
      this.pets.update(currentPets => currentPets.slice(1));
      this.swipeDirection.set(null);
      this.isSwiping.set(false);
    }, 500); // Duration should match CSS transition
  }

  private handleLike(likedPet: Pet): void {
    // Simulate a match if the pet's ID is in our predefined set
    if (this.petsThatLikeUser.has(likedPet.id)) {
      this.chatService.addMatch(likedPet);
      // Delay showing the match modal slightly for a better UX
      setTimeout(() => {
        this.lastMatch.set(likedPet);
      }, 600);
    }
  }

  closeMatchModal(): void {
    this.lastMatch.set(undefined);
  }

  openChatFromMatch(): void {
    const pet = this.lastMatch();
    if (pet) {
      this.openChat(pet);
    }
    this.closeMatchModal();
  }

  openProfile(): void {
    this.isProfileOpen.set(true);
  }

  closeProfile(): void {
    this.isProfileOpen.set(false);
  }

  saveProfile(updatedPet: Partial<Pet>): void {
    this.userProfileService.updateUserPet(updatedPet);
  }

  // View navigation methods
  showSwiping(): void {
    this.view.set('swiping');
    this.activeChatPet.set(undefined);
  }

  showChatList(): void {
    this.view.set('chatList');
  }

  openChat(pet: Match): void {
    this.activeChatPet.set(pet);
    this.view.set('chatDetail');
  }
}
