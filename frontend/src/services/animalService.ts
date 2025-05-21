import axios from 'axios';
import { Animal, CreateAnimalDto } from '../types/animal';

const API_URL = 'http://localhost:3000/animals';

export const animalService = {
  async getAll(): Promise<Animal[]> {
    const response = await axios.get<Animal[]>(API_URL);
    return response.data;
  },

  async getById(id: number): Promise<Animal> {
    const response = await axios.get<Animal>(`${API_URL}/${id}`);
    return response.data;
  },

  async create(animal: CreateAnimalDto): Promise<Animal> {
    const response = await axios.post<Animal>(API_URL, animal);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  },
}; 