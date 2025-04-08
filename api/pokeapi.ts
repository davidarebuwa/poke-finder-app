import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (limit = 20, offset = 0) => {
  const res = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  return res.data;
};

export const fetchPokemonDetails = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
};
