import { Test } from '@nestjs/testing';

import { CatService } from '../cat.service';
import {
  CAT_REPOSITORY,
  ICatRepository,
} from '../../repositories/cat.repository';
import { Cat } from '../../entities/cat.entity';
import { CatMapper } from '../../mappers/cat.mapper';

const repositoryStub: ICatRepository = {
  create: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('CatService', () => {
  let service: CatService;
  let repository: ICatRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CatService,
        { provide: CAT_REPOSITORY, useValue: repositoryStub },
      ],
    }).compile();

    service = module.get<CatService>(CatService);
    repository = module.get<ICatRepository>(CAT_REPOSITORY);
  });

  describe('create', () => {
    it('should return the cat as created by the repository', async () => {
      const catToCreate = new Cat('a1', 'Tiger', new Date('01/01/2020'), 4);

      jest.spyOn(repository, 'create').mockResolvedValue(catToCreate);

      const obtainedCat = await service.create(catToCreate);

      expect(obtainedCat).toEqual(catToCreate);
      expect(repository.create).toHaveBeenCalledWith(catToCreate);
    });
  });

  describe('getAll', () => {
    it('should return the cats as fetched by the repository', async () => {
      const fetchedCats = [
        new Cat('a1', 'Tiger', new Date('01/01/2020'), 4),
        new Cat('a2', 'Morgan', new Date('02/02/2022'), 5),
      ];

      jest.spyOn(repository, 'getAll').mockResolvedValue(fetchedCats);

      const obtainedCats = await service.getAll();

      expect(obtainedCats).toEqual(fetchedCats);
      expect(repository.getAll).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return the cat as fetched by the repository', async () => {
      const CAT_ID = 'a1';
      const fetchedCat = new Cat(CAT_ID, 'Tiger', new Date('01/01/2020'), 4);

      jest.spyOn(repository, 'getById').mockResolvedValue(fetchedCat);

      const obtainedCat = await service.getById(CAT_ID);

      expect(obtainedCat).toEqual(fetchedCat);
      expect(repository.getById).toHaveBeenCalledWith(CAT_ID);
    });
  });

  describe('update', () => {
    it('should return the cat as updated by the repository', async () => {
      const CAT_ID = 'a';
      const catUpdate = new Cat(CAT_ID, 'Morgan', new Date('02/02/2022'), 5);

      jest.spyOn(repository, 'update').mockResolvedValue(catUpdate);

      const obtainedCat = await service.update(CAT_ID, catUpdate);

      expect(obtainedCat).toEqual(catUpdate);
      expect(repository.update).toHaveBeenCalledWith(CAT_ID, catUpdate);
    });
  });

  describe('delete', () => {
    it('should resolve successfully', async () => {
      const CAT_ID = 'a1';

      jest.spyOn(repository, 'delete').mockResolvedValue();

      const deletionPromise = service.delete(CAT_ID);

      await expect(deletionPromise).resolves.not.toThrow();
      expect(repository.delete).toHaveBeenCalledWith(CAT_ID);
    });
  });
});
