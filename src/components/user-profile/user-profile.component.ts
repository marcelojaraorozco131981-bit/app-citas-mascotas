import { Component, ChangeDetectionStrategy, inject, output, OnInit, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pet } from '../../models/pet.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {
  private fb = inject(FormBuilder);

  userPet = input.required<Pet>();
  
  save = output<Partial<Pet>>();
  close = output<void>();

  profileForm = this.fb.group({
    name: ['', Validators.required],
    age: [0, [Validators.required, Validators.min(0)]],
    breed: ['', Validators.required],
    bio: ['']
  });

  ngOnInit() {
    this.profileForm.patchValue({
      name: this.userPet().name,
      age: this.userPet().age,
      breed: this.userPet().breed,
      bio: this.userPet().bio,
    });
  }
  
  onSave() {
    if (this.profileForm.valid) {
      this.save.emit(this.profileForm.value);
      this.onClose();
    }
  }

  onClose() {
    this.close.emit();
  }
}
