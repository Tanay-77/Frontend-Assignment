import { useState, useEffect, useCallback } from 'react';
import type { Pokemon } from '../types/pokemon';
import { getPokemonList, getPokemon } from '../services/pokemonApi';

export const usePokemon = (initialLimit: number = 20) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchPokemon = useCallback(async (currentOffset: number, isLoadMore: boolean = false) => {
    try {
      if (isLoadMore) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }
      setError(null);
      
      const listResponse = await getPokemonList(initialLimit, currentOffset);
      
      if (listResponse.results.length < initialLimit) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      const detailedPokemonPromises = listResponse.results.map(p => getPokemon(p.name));
      const detailedPokemon = await Promise.all(detailedPokemonPromises);
      
      setPokemon(prev => isLoadMore ? [...prev, ...detailedPokemon] : detailedPokemon);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [initialLimit]);

  useEffect(() => {
    fetchPokemon(0, false);
  }, [fetchPokemon]);

  const loadMore = () => {
    if (!isLoading && !isLoadingMore && hasMore) {
      const newOffset = offset + initialLimit;
      setOffset(newOffset);
      fetchPokemon(newOffset, true);
    }
  };

  return { pokemon, isLoading, isLoadingMore, error, hasMore, loadMore };
};
