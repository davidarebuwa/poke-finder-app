// src/types/pokemon.ts
export interface PokemonListItem {
    name: string;
    url: string;
  }
  
  export interface PokemonDetails {
    id: number;
    name: string;
    sprites: {
      front_default: string;
    };
    stats: {
      base_stat: number;
      stat: {
        name: string;
      };
    }[];
  }
  