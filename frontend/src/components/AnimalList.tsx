import { Animal } from '../types/animal';
import DeleteIcon from '@mui/icons-material/Delete';
import { animalService } from '../services/animalService';
import toast from 'react-hot-toast';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Grid, 
  Button, 
  Box 
} from '@mui/material';

interface Props {
  animals: Animal[];
  onAnimalDeleted: () => void;
}

export function AnimalList({ animals, onAnimalDeleted }: Props) {
  const handleDelete = async (id: number) => {
    try {
      await animalService.delete(id);
      toast.success('Animal eliminado exitosamente');
      onAnimalDeleted();
    } catch (error) {
      toast.error('Error al eliminar el animal');
    }
  };

  return (
    <Grid container spacing={3}>
      {animals.map((animal) => (
        <Grid key={animal.id} item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              height="200"
              image={animal.imagenUrl}
              alt={animal.nombre}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {animal.nombre}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize', mb: 1 }}>
                {animal.tipo}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {animal.descripcion}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                  size="small"
                  color="primary"
                  href={animal.wikipediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver en Wikipedia →
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(animal.id)}
                  size="small"
                >
                  Eliminar
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
} 