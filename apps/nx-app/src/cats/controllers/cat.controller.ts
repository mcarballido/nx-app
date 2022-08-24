import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CatService } from '../services/cat.service';
import { CatDTO } from '../dtos/cat.dto';
import { CatMapper } from '../mappers/cat.mapper';

@Controller('cats')
export class CatController {
  constructor(private catService: CatService, private mapper: CatMapper) {}

  @Post()
  async create(@Body() catDTO: CatDTO): Promise<CatDTO> {
    const newCat = this.mapper.dtoToEntity(catDTO);
    const createdCat = await this.catService.create(newCat);
    return this.mapper.entityToDTO(createdCat);
  }

  @Get()
  async getAll(): Promise<CatDTO[]> {
    const cats = await this.catService.getAll();
    return cats.map(this.mapper.entityToDTO);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<CatDTO> {
    const cat = await this.catService.getById(id);
    return this.mapper.entityToDTO(cat);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() catDTO: CatDTO
  ): Promise<CatDTO> {
    const catUpdate = this.mapper.dtoToEntity(catDTO);
    const cat = await this.catService.update(id, catUpdate);
    return this.mapper.entityToDTO(cat);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    return this.catService.delete(id);
  }
}
