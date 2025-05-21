import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Animal } from './types/animal';
import { animalService } from './services/animalService';
import { CreateAnimalForm } from './components/CreateAnimalForm';
import { AnimalList } from './components/AnimalList';
import './App.css';

function App() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnimals = async () => {
    try {
      const data = await animalService.getAll();
      setAnimals(data);
    } catch (error) {
      console.error('Error fetching animals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Catálogo de Animales</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Agregar Nuevo Animal</h2>
            <CreateAnimalForm onAnimalCreated={fetchAnimals} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Lista de Animales</h2>
            {isLoading ? (
              <div className="text-center">Cargando...</div>
            ) : (
              <AnimalList animals={animals} onAnimalDeleted={fetchAnimals} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
