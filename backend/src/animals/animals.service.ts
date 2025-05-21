import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private animalsRepository: Repository<Animal>,
  ) {}

  async create(createAnimalDto: Partial<Animal>): Promise<Animal> {
    const animal = this.animalsRepository.create(createAnimalDto);
    return await this.animalsRepository.save(animal);
  }

  async findAll(): Promise<Animal[]> {
    return await this.animalsRepository.find();
  }

  async findOne(id: number): Promise<Animal> {
    const animal = await this.animalsRepository.findOne({ where: { id } });
    if (!animal) {
      throw new NotFoundException(`Animal con ID ${id} no encontrado`);
    }
    return animal;
  }

  async remove(id: number): Promise<void> {
    const result = await this.animalsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Animal con ID ${id} no encontrado`);
    }
  }
} 