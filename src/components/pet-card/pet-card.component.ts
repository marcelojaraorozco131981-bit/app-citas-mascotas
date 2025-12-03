
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Pet } from '../../models/pet.model';

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class PetCardComponent {
  pet = input.required<Pet>();
}
