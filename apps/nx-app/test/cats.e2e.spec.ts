import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CatModule } from '../src/cats/cat.module';
import { CatDTO } from '../src/cats/dtos/cat.dto';
import { Cat } from '../src/cats/entities/cat.entity';
import {
  CAT_REPOSITORY,
  ICatRepository,
} from '../src/cats/repositories/cat.repository';

const catEntities = [
  new Cat('a1', 'Tiger', new Date('01/01/2020'), 4),
  new Cat('a2', 'Morgan', new Date('02/02/2022'), 5),
  new Cat('a3', 'Asha', new Date('03/03/2018'), 15),
];
const catResponses = [
  {
    id: 'a1',
    name: 'Tiger',
    dateOfBirth: new Date('01/01/2020').toISOString(),
    weight: 4,
  },
  {
    id: 'a2',
    name: 'Morgan',
    dateOfBirth: new Date('02/02/2022').toISOString(),
    weight: 5,
  },
  {
    id: 'a3',
    name: 'Asha',
    dateOfBirth: new Date('03/03/2018').toISOString(),
    weight: 15,
  },
];

describe('Cats', () => {
  let app: INestApplication;
  let catRepository: ICatRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CatModule],
    }).compile();
    app = moduleRef.createNestApplication();
    catRepository = app.get(CAT_REPOSITORY);
    catRepository['cats'] = catEntities;
    await app.init();
  });

  describe('GET /cats', () => {
    it('responds with a json containing all cats', (done) => {
      request(app.getHttpServer())
        .get('/cats')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(catResponses)
        .expect(200, done);
    });
  });

  describe('POST /cats', () => {
    it('responds with a json of the created cat', (done) => {
      const catDTO = new CatDTO('a1', 'Tiger', new Date('01/01/2020'), 4);
      const expectedResult = {
        id: catDTO.id,
        name: catDTO.name,
        dateOfBirth: catDTO.dateOfBirth.toISOString(),
        weight: catDTO.weight,
      };

      request(app.getHttpServer())
        .post('/cats')
        .send(catDTO)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(expectedResult)
        .expect(201, done);
    });
  });

  describe('GET /cats/:id', () => {
    describe('when fetching a cat that does exist', () => {
      it('responds with the cat', (done) => {
        request(app.getHttpServer())
          .get(`/cats/${catEntities[1].id}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(catResponses[1])
          .expect(200, done);
      });
    });

    describe('when fetching a cat that does not exists', () => {
      it('responds with not found error', (done) => {
        request(app.getHttpServer()).get(`/cats/RANDOM`).expect(404, done);
      });
    });
  });

  describe('PUT /cats', () => {
    it('responds with a json of the updated cat', (done) => {
      const CAT_ID = 'a1';
      const catDTO = new CatDTO(CAT_ID, 'Fluffy', new Date('08/08/2010'), 1);
      const expectedResult = {
        id: catDTO.id,
        name: catDTO.name,
        dateOfBirth: catDTO.dateOfBirth.toISOString(),
        weight: catDTO.weight,
      };

      request(app.getHttpServer())
        .put(`/cats/${CAT_ID}`)
        .send(catDTO)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(expectedResult)
        .expect(200, done);

      request(app.getHttpServer())
        .get(`/cats/${CAT_ID}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(expectedResult)
        .expect(200, done);
    });
  });

  describe('DELETE /cats/:id', () => {
    describe('when deleting a cat that does exist', () => {
      it('responds with no content', (done) => {
        request(app.getHttpServer())
          .delete(`/cats/${catEntities[0].id}`)
          .expect(204, done);
      });
    });

    describe('when deleting a cat that does not exists', () => {
      it('responds with not found error', (done) => {
        request(app.getHttpServer()).del(`/cats/RANDOM`).expect(404, done);
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
