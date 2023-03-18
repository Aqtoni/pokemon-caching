import {
  CacheInterceptor,
  Controller,
  Param,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly service: PokemonService) {}

  @UseInterceptors(CacheInterceptor)
  // @CacheKey('custom-key')
  // @CacheTTL(3000)
  @Get('/:id')
  async getPokemon(@Param('id') id: number): Promise<string> {
    return await this.service.getPokemon(+id);
  }
}
