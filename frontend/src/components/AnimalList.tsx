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
  Box,
  Dialog,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface Props {
  animals: Animal[];
  onAnimalDeleted: () => void;
}

export function AnimalList({ animals, onAnimalDeleted }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDelete = async (id: number) => {
    try {
      await animalService.delete(id);
      toast.success('Animal eliminado exitosamente');
      onAnimalDeleted();
    } catch (error) {
      toast.error('Error al eliminar el animal');
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Grid container spacing={3}>
        {animals.map((animal) => (
          <Grid key={animal.id} item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={animal.imagenUrl}
                alt={animal.nombre}
                sx={{ 
                  objectFit: 'cover',
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.8,
                    transition: 'opacity 0.3s ease-in-out'
                  }
                }}
                onClick={() => handleImageClick(animal.imagenUrl)}
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

      <Dialog
        open={!!selectedImage}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              }
            }}
            onClick={handleCloseDialog}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Imagen ampliada"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '90vh',
                objectFit: 'contain'
              }}
            />
          )}
        </Box>
      </Dialog>
    </>
  );
} 