import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  create(movie: Movie): Promise<Movie> {
    return this.moviesRepository.save(movie);
  }

  findOne(id: number): Promise<Movie | null> {
    return this.moviesRepository.findOneBy({ idMovies: id });
  }

  async remove(id: number): Promise<void> {
    await this.moviesRepository.delete(id);
  }

  async update(id: number, movie: Partial<Movie>): Promise<Movie | null> {
    await this.moviesRepository.update(id, movie);
    return this.findOne(id);
  }
}