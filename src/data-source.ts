import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Movie } from './movies/movie.entity';
import { CreateMovies1710000000000 } from './migrations/1710000000000-CreateMovies';

export default new DataSource({
  type: 'sqljs',
  location: process.env.MOVIES_DB_PATH || 'movies.db',
  autoSave: true,
  entities: [Movie],
  migrations: [CreateMovies1710000000000],
  synchronize: false,
});
