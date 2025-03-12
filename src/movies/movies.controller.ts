import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from '../entities/movie.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('movies')
@UseGuards(JwtAuthGuard)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Post()
  create(@Body() movie: Movie) {
    return this.moviesService.create(movie);
  }
}