import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(url) {
  const response = await fetch(url);
  const data = await response.json();

  const detailed = await Promise.all(
    data.results.map(async (item) => {
      try {
        const res = await fetch(item.url);
        return await res.json();
      } catch {
        return null;
      }
    })
  );

  return {
    pokemon: detailed.filter((p) => p && p.name),
    next: data.next,
  };
}

