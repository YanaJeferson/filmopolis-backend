import { Body, Controller, Get, Post, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { SearchMoviesService } from './search-movies.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

interface MovieSearchResponse {
  pageProps: {
    searchResults: any[];
  };
}
@Controller('search-movies')
@UseGuards(JwtAuthGuard)

export class SearchMoviesController {
    constructor (private readonly searchMoviesService: SearchMoviesService) {}
    
    @Get()
    findAll() {
        return this.searchMoviesService.getUrl();
    }

    @Post()
    async create(@Body() body: { movies: string }) {
        const response = await this.searchMoviesService.searchMovies(body.movies);
        return response;
    }
}
