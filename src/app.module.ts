import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import { CreateMovies1710000000000 } from './migrations/1710000000000-CreateMovies';

const isTest = process.env.NODE_ENV === 'test';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqljs',
      location: isTest ? undefined : process.env.MOVIES_DB_PATH || 'movies.db',
      autoSave: !isTest,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [CreateMovies1710000000000],
      migrationsRun: true,
      synchronize: false,
    }),
    MoviesModule,
  ],
})
export class AppModule {}
