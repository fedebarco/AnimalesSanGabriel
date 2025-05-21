import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum AnimalType {
  AVE = 'ave',
  MAMIFERO = 'mamifero',
  ANFIBIO = 'anfibio',
  REPTIL = 'reptil',
  PEZ = 'pez',
}

@Entity()
export class Animal {
  @ApiProperty({ description: 'ID único del animal', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nombre del animal', example: 'León' })
  @Column()
  nombre: string;

  @ApiProperty({
    description: 'Tipo de animal',
    enum: AnimalType,
    example: AnimalType.MAMIFERO,
  })
  @Column({
    type: 'enum',
    enum: AnimalType,
  })
  tipo: AnimalType;

  @ApiProperty({
    description: 'Descripción detallada del animal',
    example: 'El león es un mamífero carnívoro de la familia de los félidos...',
  })
  @Column('text')
  descripcion: string;

  @ApiProperty({
    description: 'URL del artículo de Wikipedia',
    example: 'https://es.wikipedia.org/wiki/Panthera_leo',
  })
  @Column()
  wikipediaUrl: string;

  @ApiProperty({
    description: 'URL de la imagen representativa',
    example: 'https://ejemplo.com/imagen-leon.jpg',
  })
  @Column()
  imagenUrl: string;

  @ApiProperty({
    description: 'Fecha de creación del registro',
    example: '2024-03-20T12:00:00Z',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
} 