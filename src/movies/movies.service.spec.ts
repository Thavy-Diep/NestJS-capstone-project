import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let repository: {
    find: jest.Mock;
    findOneBy: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
    remove: jest.Mock;
  };

  beforeEach(async () => {
    repository = {
      find: jest.fn().mockResolvedValue([]),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        { provide: getRepositoryToken(Movie), useValue: repository },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('lists movies in repository order', async () => {
    await expect(service.findAll()).resolves.toEqual([]);
    expect(repository.find).toHaveBeenCalledWith({ order: { id: 'ASC' } });
  });

  it('throws NotFoundException when a movie does not exist', async () => {
    repository.findOneBy.mockResolvedValue(null);
    await expect(service.findOne(404)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('creates a movie using the repository', async () => {
    const movie = { id: 1, title: 'Arrival' } as Movie;
    repository.create.mockReturnValue(movie);
    repository.save.mockResolvedValue(movie);
    await expect(service.create({ title: 'Arrival' })).resolves.toBe(movie);
    expect(repository.create).toHaveBeenCalledWith({ title: 'Arrival' });
  });
});
