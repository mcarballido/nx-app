import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CatService } from '../services/cat.service';
import { CatDTO } from '../dtos/cat.dto';
import { Cat } from '../entities/cat.entity';

@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  async create(@Body() catDTO: CatDTO): Promise<CatDTO> {
    const newCat = new Cat(
      catDTO.id,
      catDTO.name,
      catDTO.dateOfBirth,
      catDTO.weight
    );

    return this.catService.create(newCat);
  }

  @Get()
  async getAll(): Promise<CatDTO[]> {
    return this.catService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<CatDTO> {
    return this.catService.getById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() catDTO: CatDTO
  ): Promise<CatDTO> {
    const catUpdate = new Cat(
      catDTO.id,
      catDTO.name,
      catDTO.dateOfBirth,
      catDTO.weight
    );

    return this.catService.update(id, catUpdate);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.catService.delete(id);
  }
}
