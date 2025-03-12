import { Module } from '@nestjs/common';
import { SearchMoviesService } from './search-movies.service';
import { SearchMoviesController } from './search-movies.controller';

@Module({
  controllers: [SearchMoviesController],
  providers: [SearchMoviesService]
})
export class SearchMoviesModule {}
