import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CachedPokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pokemonId: number;

  @Column()
  name: string;

  @Column()
  createdAt: Date;
}
