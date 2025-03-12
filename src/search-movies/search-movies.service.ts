import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class SearchMoviesService {
  getUrl() {
    return { url: 'api.com/?apikey=4a4a6f9c&s=Batman' };
  }
  async searchMovies(movie: string) {
    const urlConsult =
      'https://www.cuevana.is/_next/data/8R0H-ZmQSoVU5r0u8suVP/es/search.json?q=';
    const url = urlConsult + encodeURIComponent(movie);

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.pageProps.movies.map((movie) => ({
        title: movie.titles.name,
        poster: movie.images.poster,
        overview: movie.overview,
        id: movie.TMDbId,
        slug: movie.url.slug,
      }));
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Error fetching movies: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
