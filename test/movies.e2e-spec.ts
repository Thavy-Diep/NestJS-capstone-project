import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Movies API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('lists movies, creates only with a token, validates input and performs CRUD', async () => {
    await request(app.getHttpServer()).get('/movies').expect(200).expect([]);

    await request(app.getHttpServer())
      .post('/movies')
      .send({ title: 'Arrival' })
      .expect(401);

    await request(app.getHttpServer())
      .post('/movies')
      .set('Authorization', 'Bearer test-movie-token')
      .send({ title: '' })
      .expect(400);

    const createdResponse = await request(app.getHttpServer())
      .post('/movies')
      .set('Authorization', 'Bearer test-movie-token')
      .send({
        title: 'Arrival',
        director: 'Denis Villeneuve',
        releaseYear: 2016,
        genre: 'Science fiction',
        rating: 9,
      })
      .expect(201);

    const id = createdResponse.body.id as number;
    expect(createdResponse.body.title).toBe('Arrival');

    await request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect(({ body }) =>
        expect(body.map((movie: { id: number }) => movie.id)).toContain(id),
      );

    await request(app.getHttpServer())
      .get(`/movies/${id}`)
      .expect(200)
      .expect(({ body }) => expect(body.director).toBe('Denis Villeneuve'));

    await request(app.getHttpServer())
      .patch(`/movies/${id}`)
      .send({ rating: 10 })
      .expect(200)
      .expect(({ body }) => expect(body.rating).toBe(10));

    await request(app.getHttpServer()).get('/movies/999999').expect(404);

    await request(app.getHttpServer()).delete(`/movies/${id}`).expect(200);
    await request(app.getHttpServer()).get(`/movies/${id}`).expect(404);
  });
});
