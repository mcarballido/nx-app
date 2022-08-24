import { Test } from '@nestjs/testing';

import { CatController } from '../cat.controller';
import { Cat } from '../../entities/cat.entity';
import { CatService } from '../../services/cat.service';
import { CatMapper } from '../../mappers/cat.mapper';
import { CatDTO } from '../../dtos/cat.dto';

const serviceStub = {
  create: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('CatController', () => {
  let controller: CatController;
  let service: CatService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CatController,
        CatMapper, // I will mock this in the future and create UTs for the Mapper itself
        { provide: CatService, useValue: serviceStub },
      ],
    }).compile();

    controller = module.get<CatController>(CatController);
    service = module.get<CatService>(CatService);
  });

  describe('create', () => {
    it('should return the cat as created by the service', async () => {
      const cat = new Cat('a1', 'Tiger', new Date('01/01/2020'), 4);
      const expectedCat = new CatDTO(
        cat.id,
        cat.name,
        cat.dateOfBirth,
        cat.weight
      );

      jest.spyOn(service, 'create').mockResolvedValue(cat);

      const obtainedCat = await controller.create(cat);

      expect(obtainedCat).toEqual(expectedCat);
      expect(service.create).toHaveBeenCalledWith(cat);
    });
  });

  describe('getAll', () => {
    it('should return the cats as fetched by the service', async () => {
      const cat1 = new Cat('a1', 'Tiger', new Date('01/01/2020'), 4);
      const cat2 = new Cat('a2', 'Morgan', new Date('02/02/2022'), 5);
      const fetchedCats = [cat1, cat2];
      const expectedCats = [
        new CatDTO(cat1.id, cat1.name, cat1.dateOfBirth, cat1.weight),
        new CatDTO(cat2.id, cat2.name, cat2.dateOfBirth, cat2.weight),
      ];

      jest.spyOn(serviceStub, 'getAll').mockResolvedValue(fetchedCats);

      const obtainedCats = await controller.getAll();

      expect(obtainedCats).toEqual(expectedCats);
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return the cat as fetched by the service', async () => {
      const CAT_ID = 'a1';
      const fetchedCat = new Cat(CAT_ID, 'Tiger', new Date('01/01/2020'), 4);
      const expectedCat = new CatDTO(
        fetchedCat.id,
        fetchedCat.name,
        fetchedCat.dateOfBirth,
        fetchedCat.weight
      );

      jest.spyOn(service, 'getById').mockResolvedValue(fetchedCat);

      const obtainedCat = await controller.getById(CAT_ID);

      expect(obtainedCat).toEqual(expectedCat);
      expect(service.getById).toHaveBeenCalledWith(CAT_ID);
    });
  });

  describe('update', () => {
    it('should return the cat as updated by the service', async () => {
      const CAT_ID = 'a';
      const catUpdate = new Cat(CAT_ID, 'Morgan', new Date('02/02/2022'), 5);
      const expectedCat = new CatDTO(
        catUpdate.id,
        catUpdate.name,
        catUpdate.dateOfBirth,
        catUpdate.weight
      );

      jest.spyOn(service, 'update').mockResolvedValue(catUpdate);

      const obtainedCat = await controller.update(CAT_ID, catUpdate);

      expect(obtainedCat).toEqual(expectedCat);
      expect(service.update).toHaveBeenCalledWith(CAT_ID, catUpdate);
    });
  });

  describe('delete', () => {
    it('should resolve successfully', async () => {
      const CAT_ID = 'a1';

      jest.spyOn(service, 'delete').mockResolvedValue();

      const deletionPromise = controller.delete(CAT_ID);

      await expect(deletionPromise).resolves.not.toThrow();
      expect(service.delete).toHaveBeenCalledWith(CAT_ID);
    });
  });
});
