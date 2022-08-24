import { Injectable } from '@nestjs/common';
import { Cat } from '../entities/cat.entity';

const cats: Cat[] = [
  new Cat('a1', 'Tiger', new Date('01/01/2020'), 4),
  new Cat('a2', 'Morgan', new Date('02/02/2022'), 5),
];

@Injectable()
export class CatService {
  async getAll(): Promise<Cat[]> {
    return cats;
  }

  async create(cat: Cat): Promise<Cat> {
    return cat;
  }

  async getById(id: string): Promise<Cat> {
    const foundCat = cats.find((cat) => cat.id === id);

    if (!foundCat) {
      throw new Error('Cat not found');
    }

    return foundCat;
  }

  async update(id: string, catUpdate: Cat): Promise<Cat> {
    const cat = await this.getById(id);

    cat.name = catUpdate.name;
    cat.dateOfBirth = catUpdate.dateOfBirth;
    cat.weight = catUpdate.weight;

    return cat;
  }

  async delete(id: string): Promise<void> {
    id
    // deletes cat
  }
}
