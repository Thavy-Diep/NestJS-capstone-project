import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  director: string | null;

  @Column({ type: 'integer', nullable: true })
  releaseYear: number | null;

  @Column({ type: 'varchar', length: 80, nullable: true })
  genre: string | null;

  @Column({ type: 'integer', nullable: true })
  rating: number | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;
}
