import { Injectable, signal } from '@angular/core';
import { Pet } from '../models/pet.model';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  // Initial profile data for the user's pet
  private userPet = signal<Pet>({
    id: 0, // User's pet won't have a swipeable ID
    name: 'Mi Mascota',
    age: 2,
    breed: 'Compañero Leal',
    bio: '¡Listo para hacer nuevos amigos!',
    imageUrl: 'https://picsum.photos/seed/my-pet/150/150'
  });

  getUserPet() {
    return this.userPet.asReadonly();
  }

  updateUserPet(updatedPet: Partial<Pet>) {
    this.userPet.update(currentPet => ({
      ...currentPet,
      ...updatedPet
    }));
  }
}
