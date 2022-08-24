import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { Cat } from '../../../entities/cat.entity';
import { CatInMemoryRepository } from '../cat.in-memory.repository';
import { CAT_REPOSITORY, ICatRepository } from '../../cat.repository';

describe('CatInMemoryRepository', () => {
  let catInMemoryRepository: ICatRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [{ provide: CAT_REPOSITORY, useClass: CatInMemoryRepository }],
    }).compile();

    catInMemoryRepository = module.get<ICatRepository>(CAT_REPOSITORY);
  });

  describe('create', () => {
    it('should save the cat into the list', async () => {
      catInMemoryRepository['cats'] = [];
      const cat = new Cat('a1', 'Tiger', new Date('01/01/2020'), 4);

      await catInMemoryRepository.create(cat);

      expect(catInMemoryRepository['cats']).toEqual([cat]);
    });
  });

  describe('getAll', () => {
    it('should get all cats from the list', async () => {
      const catsList = [
        new Cat('a1', 'Morgan', new Date('02/02/2022'), 5),
        new Cat('a2', 'Asha', new Date('03/03/2018'), 15),
      ];
      catInMemoryRepository['cats'] = catsList;

      const result = await catInMemoryRepository.getAll();

      expect(result).toEqual(catsList);
    });
  });

  describe('getById', () => {
    describe('when sending an ID of an existing cat', () => {
      it('should get the cat from the list', async () => {
        const catsList = [
          new Cat('a1', 'Morgan', new Date('02/02/2022'), 5),
          new Cat('a2', 'Asha', new Date('03/03/2018'), 15),
        ];
        const expectedCat = new Cat('a2', 'Asha', new Date('03/03/2018'), 15);
        catInMemoryRepository['cats'] = catsList;

        const fetchedCat = await catInMemoryRepository.getById('a2');

        expect(fetchedCat).toEqual(expectedCat);
      });
    });

    describe('when sending an ID of a non-existing cat', () => {
      it('should throw a not found error', async () => {
        catInMemoryRepository['cats'] = [
          new Cat('a1', 'Morgan', new Date('02/02/2022'), 5),
          new Cat('a2', 'Asha', new Date('03/03/2018'), 15),
        ];

        const resultPromise = catInMemoryRepository.getById('a100');

        await expect(resultPromise).rejects.toThrow(NotFoundException);
      });
    });
  });

  describe('update', () => {
    it('should update the cat in the list', async () => {
      const catUpdate = new Cat('a2', 'Tiger', new Date('01/01/2020'), 4);
      const catsList = [
        new Cat('a1', 'Morgan', new Date('02/02/2022'), 5),
        new Cat('a2', 'Asha', new Date('03/03/2018'), 15),
        new Cat('a3', 'Asha', new Date('04/04/2016'), 35),
      ];
      const expectedCatList = [catsList[0], catUpdate, catsList[2]];
      catInMemoryRepository['cats'] = catsList;

      const obtainedCat = await catInMemoryRepository.update('a2', catUpdate);

      expect(catInMemoryRepository['cats']).toEqual(expectedCatList);
      expect(obtainedCat).toEqual(catUpdate);
    });
  });

  describe('delete', () => {
    describe('when sending an ID of an existing cat', () => {
      it('should delete the cat from the list', async () => {
        const catsList = [
          new Cat('a1', 'Morgan', new Date('02/02/2022'), 5),
          new Cat('a2', 'Asha', new Date('03/03/2018'), 15),
        ];
        const expectedCatList = [
          new Cat('a2', 'Asha', new Date('03/03/2018'), 15),
        ];
        catInMemoryRepository['cats'] = catsList;

        await catInMemoryRepository.delete('a1');

        expect(catInMemoryRepository['cats']).toEqual(expectedCatList);
      });
    });

    describe('when sending an ID of a non-existing cat', () => {
      it('should throw a not found error', async () => {
        const catsList = [
          new Cat('a1', 'Morgan', new Date('02/02/2022'), 5),
          new Cat('a2', 'Asha', new Date('03/03/2018'), 15),
        ];
        catInMemoryRepository['cats'] = catsList;

        const resultPromise = catInMemoryRepository.delete('a100');

        expect(catInMemoryRepository['cats']).toEqual(catsList);
        await expect(resultPromise).rejects.toThrow(NotFoundException);
      });
    });
  });
});
