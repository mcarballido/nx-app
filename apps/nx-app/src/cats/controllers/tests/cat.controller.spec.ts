import { Test, TestingModule } from '@nestjs/testing';

import { CatController } from '../cat.controller';
import { CatService } from '../../services/cat.service';

describe('CatController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [CatController],
      providers: [CatService],
    }).compile();
  });

  // describe('getData', () => {
  //   it('should return "Welcome to nx-app!"', () => {
  //     const appController = app.get<CatController>(CatController);
  //     expect(appController.getAll()).toEqual({
  //       message: 'Welcome to nx-app!',
  //     });
  //   });
  // });
});
