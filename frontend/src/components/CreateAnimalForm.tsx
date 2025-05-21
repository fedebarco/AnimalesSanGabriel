import { useState } from 'react';
import { AnimalType, CreateAnimalDto } from '../types/animal';
import { animalService } from '../services/animalService';
import toast from 'react-hot-toast';
import wiki from 'wikipedia';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';

interface Props {
  onAnimalCreated: () => void;
}

export function CreateAnimalForm({ onAnimalCreated }: Props) {
  const [formData, setFormData] = useState<CreateAnimalDto>({
    nombre: '',
    tipo: AnimalType.MAMIFERO,
    descripcion: '',
    wikipediaUrl: '',
    imagenUrl: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm) {
      toast.error('Por favor, ingresa un nombre para buscar');
      return;
    }

    setIsLoading(true);
    try {
      await wiki.setLang('es');
      const searchResults = await wiki.search(searchTerm);
      if (searchResults.results.length === 0) {
        toast.error('No se encontraron resultados');
        return;
      }

      const page = await wiki.page(searchResults.results[0].title);
      const summary = await page.summary();
      const content = await page.content();
      
      // Intentar encontrar el nombre científico
      let scientificName = '';
      const scientificNameRegex = /Nombre científico[^\n]*?([A-Z][a-z]+ [a-z]+)/;
      const match = content.match(scientificNameRegex);
      if (match && match[1]) {
        scientificName = match[1];
      }

      // Si no se encuentra en el formato esperado, buscar en otros formatos comunes
      if (!scientificName) {
        const alternativeRegex = /\(([A-Z][a-z]+ [a-z]+)\)/;
        const altMatch = content.match(alternativeRegex);
        if (altMatch && altMatch[1]) {
          scientificName = altMatch[1];
        }
      }

      const formattedName = scientificName 
        ? `${summary.title} (${scientificName})`
        : summary.title;
      
      setFormData({
        ...formData,
        nombre: formattedName,
        descripcion: summary.extract,
        wikipediaUrl: `https://es.wikipedia.org/wiki/${encodeURIComponent(summary.title)}`,
        imagenUrl: summary.originalimage?.source || '',
      });
      
      toast.success('Información cargada automáticamente');
    } catch (error) {
      toast.error('Error al buscar la información');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await animalService.create(formData);
      toast.success('Animal creado exitosamente');
      onAnimalCreated();
      setFormData({
        nombre: '',
        tipo: AnimalType.MAMIFERO,
        descripcion: '',
        wikipediaUrl: '',
        imagenUrl: '',
      });
      setSearchTerm('');
    } catch (error) {
      toast.error('Error al crear el animal');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Precargar Datos de Wikipedia
        </Typography>

        <Card sx={{ mb: 3, bgcolor: '#f8f9fa' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              <InfoIcon color="info" sx={{ mt: 0.5 }} />
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
                  ¿Cómo funciona?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  1. Ingresa el nombre del animal que deseas agregar (por ejemplo: "León", "Águila Real")
                  <br />
                  2. Haz clic en "Precargar Datos" para buscar automáticamente:
                  <br />
                  • Nombre científico y común
                  <br />
                  • Descripción detallada
                  <br />
                  • Enlace a Wikipedia
                  <br />
                  • Imagen representativa
                  <br />
                  3. Revisa y ajusta la información según sea necesario antes de crear el registro
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Nombre del animal a buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ bgcolor: 'white' }}
            placeholder="Ejemplo: León, Águila Real, Delfín..."
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={isLoading}
            startIcon={<SearchIcon />}
            sx={{ px: 4, whiteSpace: 'nowrap' }}
          >
            {isLoading ? 'Buscando...' : 'Precargar Datos'}
          </Button>
        </Box>

        <Paper component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Información del Animal
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Nombre"
              variant="outlined"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              required
            />

            <FormControl fullWidth>
              <InputLabel id="tipo-label">Tipo</InputLabel>
              <Select
                labelId="tipo-label"
                value={formData.tipo}
                label="Tipo"
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value as AnimalType })}
              >
                {Object.values(AnimalType).map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Descripción"
              variant="outlined"
              multiline
              rows={4}
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              required
            />

            <TextField
              fullWidth
              label="URL de Wikipedia"
              variant="outlined"
              type="url"
              value={formData.wikipediaUrl}
              onChange={(e) => setFormData({ ...formData, wikipediaUrl: e.target.value })}
              required
            />

            <TextField
              fullWidth
              label="URL de la Imagen"
              variant="outlined"
              type="url"
              value={formData.imagenUrl}
              onChange={(e) => setFormData({ ...formData, imagenUrl: e.target.value })}
              required
            />

            {formData.imagenUrl && (
              <Box sx={{ mt: 1 }}>
                <img
                  src={formData.imagenUrl}
                  alt={formData.nombre}
                  style={{
                    maxHeight: '80px',
                    maxWidth: '160px',
                    objectFit: 'contain',
                    borderRadius: '4px',
                    backgroundColor: '#f5f5f5',
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/200x150?text=Imagen+no+disponible';
                  }}
                />
              </Box>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AddIcon />}
              sx={{ mt: 2 }}
            >
              Crear Animal
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
} 