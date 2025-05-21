export enum AnimalType {
  AVE = 'ave',
  MAMIFERO = 'mamifero',
  ANFIBIO = 'anfibio',
  REPTIL = 'reptil',
  PEZ = 'pez',
}

export interface Animal {
  id: number;
  nombre: string;
  tipo: AnimalType;
  descripcion: string;
  wikipediaUrl: string;
  imagenUrl: string;
  createdAt: string;
}

export type CreateAnimalDto = Omit<Animal, 'id' | 'createdAt'>; 