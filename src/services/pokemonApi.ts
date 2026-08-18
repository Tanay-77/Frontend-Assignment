import type { Pokemon, PokemonListResponse, PokemonTypeResponse } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async (limit: number = 20, offset: number = 0): Promise<PokemonListResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) throw new Error('Failed to fetch Pokémon list');
    return await response.json();
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    throw error;
  }
};

export const getPokemon = async (nameOrId: string | number): Promise<Pokemon> => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
    if (!response.ok) throw new Error(`Failed to fetch Pokémon: ${nameOrId}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching Pokémon ${nameOrId}:`, error);
    throw error;
  }
};

export const getPokemonByType = async (type: string): Promise<PokemonTypeResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/type/${type}`);
    if (!response.ok) throw new Error(`Failed to fetch Pokémon by type: ${type}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching Pokémon by type ${type}:`, error);
    throw error;
  }
};

export const getPokemonTypes = async (): Promise<{ name: string; url: string }[]> => {
  try {
    const response = await fetch(`${BASE_URL}/type`);
    if (!response.ok) throw new Error('Failed to fetch Pokémon types');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching Pokémon types:', error);
    throw error;
  }
};
