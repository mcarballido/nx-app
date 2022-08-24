import { Injectable } from '@nestjs/common';
import { Cat } from '../entities/cat.entity';
import { CatDTO } from '../dtos/cat.dto';

@Injectable()
export class CatMapper {
  entityToDTO(cat: Cat): CatDTO {
    return new CatDTO(cat.id, cat.name, cat.dateOfBirth, cat.weight);
  }

  dtoToEntity(cat: CatDTO): Cat {
    return new Cat(cat.id, cat.name, cat.dateOfBirth, cat.weight);
  }
}
