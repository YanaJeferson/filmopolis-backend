import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn({ name: 'id_movies' })
  idMovies: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  download: number;

  @Column()
  upload: number;
}