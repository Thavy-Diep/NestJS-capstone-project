import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMovies1710000000000 implements MigrationInterface {
  name = 'CreateMovies1710000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movies',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'title', type: 'varchar', length: '200', isNullable: false },
          { name: 'director', type: 'varchar', length: '120', isNullable: true },
          { name: 'releaseYear', type: 'integer', isNullable: true },
          { name: 'genre', type: 'varchar', length: '80', isNullable: true },
          { name: 'rating', type: 'integer', isNullable: true },
          { name: 'notes', type: 'text', isNullable: true },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movies');
  }
}
