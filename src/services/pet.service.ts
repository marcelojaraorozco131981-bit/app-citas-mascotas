import { Injectable } from '@angular/core';
import { Pet } from '../models/pet.model';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private pets: Pet[] = [
    {
      id: 1,
      name: 'Buddy',
      age: 3,
      breed: 'Golden Retriever',
      bio: 'Le encantan los largos paseos por la playa y perseguir ardillas. Un verdadero caballero.',
      imageUrl: 'https://picsum.photos/seed/Buddy/400/600',
    },
    {
      id: 2,
      name: 'Lucy',
      age: 2,
      breed: 'Gato Siamés',
      bio: 'Una dama sofisticada que disfruta tomando el sol y juzgando tus elecciones de vida.',
      imageUrl: 'https://picsum.photos/seed/Lucy/400/600',
    },
    {
      id: 3,
      name: 'Rocky',
      age: 5,
      breed: 'Bóxer',
      bio: '¡Lleno de energía! Buscando un compañero para correr y un campeón de tira y afloja.',
      imageUrl: 'https://picsum.photos/seed/Rocky/400/600',
    },
    {
      id: 4,
      name: 'Chloe',
      age: 1,
      breed: 'Caniche',
      bio: 'Puedo parecer elegante, pero me encanta ensuciarme las patas en el barro.',
      imageUrl: 'https://picsum.photos/seed/Chloe/400/600',
    },
    {
      id: 5,
      name: 'Max',
      age: 4,
      breed: 'Pastor Alemán',
      bio: 'Leal, protector y en secreto un gran blandito al que le encantan los mimos en la barriga.',
      imageUrl: 'https://picsum.photos/seed/Max/400/600',
    },
    {
      id: 6,
      name: 'Misty',
      age: 6,
      breed: 'Gato Persa',
      bio: 'Requiere adoración constante y el atún más fino. Te bendeciré con mi presencia.',
      imageUrl: 'https://picsum.photos/seed/Misty/400/600',
    },
    {
      id: 7,
      name: 'Zeus',
      age: 2,
      breed: 'Husky',
      bio: 'Un rey del drama al que le encanta cantar la canción de su gente. ¡Vamos a la aventura!',
      imageUrl: 'https://picsum.photos/seed/Zeus/400/600',
    },
    {
      id: 8,
      name: 'Bella',
      age: 3,
      breed: 'Beagle',
      bio: '¡Mi nariz marca el camino! Sigámosla para encontrar los mejores bocadillos y amigos.',
      imageUrl: 'https://picsum.photos/seed/Bella/400/600',
    },
    {
      id: 9,
      name: 'Oliver',
      age: 2,
      breed: 'Gato Atigrado',
      bio: 'Curioso, juguetón y un experto en encontrar los lugares más cómodos para dormir.',
      imageUrl: 'https://picsum.photos/seed/Oliver/400/600',
    },
     {
      id: 10,
      name: 'Daisy',
      age: 4,
      breed: 'Corgi',
      bio: 'Una bajita con un gran corazón. Mi "sploot" es legendario. Lista para los abrazos.',
      imageUrl: 'https://picsum.photos/seed/Daisy/400/600',
    }
  ];

  getPets(): Pet[] {
    return [...this.pets]; // Return a copy to prevent mutation
  }
}