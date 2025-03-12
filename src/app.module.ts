import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { User } from './entities/user.entity';
import { Movie } from './entities/movie.entity';
import { SearchMoviesModule } from './search-movies/search-movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'better-sqlite3',
        database: configService.get('DATABASE_PATH'),
        entities: [User, Movie],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    MoviesModule,
    SearchMoviesModule,
  ],
})
export class AppModule {}
