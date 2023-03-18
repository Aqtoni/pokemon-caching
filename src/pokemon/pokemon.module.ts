import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CachedPokemon } from './entity/entity.pokemon';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([CachedPokemon])],
  providers: [PokemonService],
  controllers: [PokemonController],
})
export class PokemonModule {}
