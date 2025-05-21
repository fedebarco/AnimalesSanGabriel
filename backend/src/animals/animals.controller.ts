import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AnimalsService } from './animals.service';
import { Animal } from './entities/animal.entity';

@ApiTags('animals')
@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo animal' })
  @ApiResponse({ status: 201, description: 'Animal creado exitosamente', type: Animal })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: Animal, description: 'Datos del animal a crear' })
  create(@Body() createAnimalDto: Partial<Animal>) {
    return this.animalsService.create(createAnimalDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los animales' })
  @ApiResponse({ status: 200, description: 'Lista de animales', type: [Animal] })
  findAll() {
    return this.animalsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un animal por ID' })
  @ApiParam({ name: 'id', description: 'ID del animal', example: 1 })
  @ApiResponse({ status: 200, description: 'Animal encontrado', type: Animal })
  @ApiResponse({ status: 404, description: 'Animal no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.animalsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un animal' })
  @ApiParam({ name: 'id', description: 'ID del animal a eliminar', example: 1 })
  @ApiResponse({ status: 200, description: 'Animal eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Animal no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.animalsService.remove(id);
  }
} 