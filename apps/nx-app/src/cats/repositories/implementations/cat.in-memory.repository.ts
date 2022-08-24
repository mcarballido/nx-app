import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from '../../entities/cat.entity';
import { ICatRepository } from '../cat.repository';

@Injectable()
export class CatInMemoryRepository implements ICatRepository {
  private cats: Cat[] = [
    new Cat('a1', 'Tiger', new Date('01/01/2020'), 4),
    new Cat('a2', 'Morgan', new Date('02/02/2022'), 5),
    new Cat('a3', 'Asha', new Date('03/03/2018'), 15),
  ];

  async create(cat: Cat): Promise<Cat> {
    this.cats.push(cat);
    return cat;
  }

  async getAll(): Promise<Cat[]> {
    return this.cats;
  }

  async getById(id: string): Promise<Cat> {
    const foundCat = this.cats.find((cat) => cat.id === id);

    if (!foundCat) {
      throw new NotFoundException('The cat of the provided ID does not exist.');
    }

    return foundCat;
  }

  async update(id: string, catUpdate: Cat): Promise<Cat> {
    const foundCat = await this.getById(id);
    foundCat.name = catUpdate.name;
    foundCat.dateOfBirth = catUpdate.dateOfBirth;
    foundCat.weight = catUpdate.weight;
    return foundCat;
  }

  async delete(id: string): Promise<void> {
    for (let i = 0; i < this.cats.length; i++) {
      if (this.cats[i].id === id) {
        this.cats.splice(i, 1);
        return;
      }
    }

    throw new NotFoundException('The cat of the provided ID does not exist.');
  }
}
