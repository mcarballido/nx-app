import { Test } from '@nestjs/testing';

import { CatService } from '../cat.service';

describe('AppService', () => {
  let service: CatService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [CatService],
    }).compile();

    service = app.get<CatService>(CatService);
  });

  // describe('getData', () => {
  //   it('should return "Welcome to nx-app!"', () => {
  //     expect(service.getAll()).toEqual({ message: 'Welcome to nx-app!' });
  //   });
  // });
});
