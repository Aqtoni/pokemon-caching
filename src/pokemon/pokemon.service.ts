import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CachedPokemon } from './entity/entity.pokemon';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PokemonService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(CachedPokemon)
    private postgresRepository: Repository<CachedPokemon>,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async getPokemon(id: number): Promise<string> {
    const cacheKey = `pokemon:${id}`;
    const cachedData = await this.cacheService.get<{ name: string }>(cacheKey);

    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData.name;
    }

    const cachedPokemon = await this.postgresRepository.findOne({
      where: {
        pokemonId: id,
      },
    });

    if (cachedPokemon) {
      console.log(`Getting data from database!`);
      this.cacheService.set(cacheKey, { name: cachedPokemon.name });
      return cachedPokemon.name;
    }

    const { data } = await this.httpService.axiosRef.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );

    const newCachedPokemon = new CachedPokemon();
    newCachedPokemon.pokemonId = id;
    newCachedPokemon.name = data.name;
    newCachedPokemon.createdAt = new Date();
    await this.postgresRepository.save(newCachedPokemon);

    this.cacheService.set(cacheKey, { name: newCachedPokemon.name });

    console.log(`Getting data from API!`);
    return data.name;
  }
}
