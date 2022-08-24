import { Test } from '@nestjs/testing';

import { CatController } from '../cat.controller';
import { Cat } from '../../entities/cat.entity';
import { CatService } from '../../services/cat.service';

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
        { provide: CatService, useValue: serviceStub },
      ],
    }).compile();

    controller = module.get<CatController>(CatController);
    service = module.get<CatService>(CatService);
  });

  describe('create', () => {
    it('should return the cat as created by the service', async () => {
      const cat = new Cat('a1', 'Tiger', new Date('01/01/2020'), 4);

      jest.spyOn(service, 'create').mockResolvedValue(cat);

      const obtainedCat = await controller.create(cat);

      expect(obtainedCat).toEqual(cat);
      expect(service.create).toHaveBeenCalledWith(cat);
    });
  });

  describe('getAll', () => {
    it('should return the cats as fetched by the service', async () => {
      const fetchedCats = [
        new Cat('a1', 'Tiger', new Date('01/01/2020'), 4),
        new Cat('a2', 'Morgan', new Date('02/02/2022'), 5),
      ];

      jest.spyOn(serviceStub, 'getAll').mockResolvedValue(fetchedCats);

      const obtainedCats = await controller.getAll();

      expect(obtainedCats).toEqual(fetchedCats);
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return the cat as fetched by the service', async () => {
      const CAT_ID = 'a1';
      const fetchedCat = new Cat(CAT_ID, 'Tiger', new Date('01/01/2020'), 4);

      jest.spyOn(service, 'getById').mockResolvedValue(fetchedCat);

      const obtainedCat = await controller.getById(CAT_ID);

      expect(obtainedCat).toEqual(fetchedCat);
      expect(service.getById).toHaveBeenCalledWith(CAT_ID);
    });
  });

  describe('update', () => {
    it('should return the cat as updated by the service', async () => {
      const CAT_ID = 'a';
      const catUpdate = new Cat(CAT_ID, 'Morgan', new Date('02/02/2022'), 5);

      jest.spyOn(service, 'update').mockResolvedValue(catUpdate);

      const obtainedCat = await controller.update(CAT_ID, catUpdate);

      expect(obtainedCat).toEqual(catUpdate);
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
