import { useState, useEffect, useCallback, useRef } from 'react';
import type { Pokemon } from '../types/pokemon';
import { getPokemonList, getPokemon, getPokemonByType } from '../services/pokemonApi';

export const usePokemon = (
  initialLimit: number = 20,
  searchQuery: string = '',
  selectedType: string = ''
) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // For standard pagination
  const [offset, setOffset] = useState<number>(0);
  
  // For type-based pagination
  const [typePokemonList, setTypePokemonList] = useState<{name: string, url: string}[]>([]);
  const [typeOffset, setTypeOffset] = useState<number>(0);
  
  const [hasMore, setHasMore] = useState<boolean>(true);

  // We use a ref to track the latest request to prevent race conditions
  const currentRequestId = useRef(0);

  const fetchInitial = useCallback(async () => {
    const requestId = ++currentRequestId.current;
    try {
      setIsLoading(true);
      setError(null);
      setHasMore(false); // Default to false, set true if needed
      
      if (searchQuery) {
        // Search mode
        try {
          const data = await getPokemon(searchQuery.toLowerCase());
          if (requestId === currentRequestId.current) {
            setPokemon([data]);
          }
        } catch (err) {
          if (requestId === currentRequestId.current) {
            setPokemon([]);
            setError(`No Pokémon found matching "${searchQuery}"`);
          }
        }
      } else if (selectedType) {
        // Type filter mode
        const typeData = await getPokemonByType(selectedType);
        const allPokemonOfType = typeData.pokemon.map((p) => p.pokemon);
        
        if (requestId === currentRequestId.current) {
          setTypePokemonList(allPokemonOfType);
          setTypeOffset(initialLimit);
          setHasMore(allPokemonOfType.length > initialLimit);
          
          const firstPageNames = allPokemonOfType.slice(0, initialLimit);
          const detailed = await Promise.all(firstPageNames.map((p) => getPokemon(p.name)));
          
          if (requestId === currentRequestId.current) {
            setPokemon(detailed);
          }
        }
      } else {
        // Default mode
        const listData = await getPokemonList(initialLimit, 0);
        
        if (requestId === currentRequestId.current) {
          setOffset(initialLimit);
          setHasMore(listData.results.length === initialLimit);
          
          const detailed = await Promise.all(listData.results.map((p) => getPokemon(p.name)));
          
          if (requestId === currentRequestId.current) {
            setPokemon(detailed);
          }
        }
      }
    } catch (err) {
      if (requestId === currentRequestId.current) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setPokemon([]);
      }
    } finally {
      if (requestId === currentRequestId.current) {
        setIsLoading(false);
      }
    }
  }, [initialLimit, searchQuery, selectedType]);

  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  const loadMore = async () => {
    if (isLoading || isLoadingMore || !hasMore || searchQuery) return;

    const requestId = ++currentRequestId.current;
    
    try {
      setIsLoadingMore(true);
      
      if (selectedType) {
        // Load more for type filter
        const nextOffset = typeOffset + initialLimit;
        const nextBatch = typePokemonList.slice(typeOffset, nextOffset);
        
        const detailed = await Promise.all(nextBatch.map((p) => getPokemon(p.name)));
        
        if (requestId === currentRequestId.current) {
          setPokemon(prev => [...prev, ...detailed]);
          setTypeOffset(nextOffset);
          setHasMore(nextOffset < typePokemonList.length);
        }
      } else {
        // Load more for default list
        const listData = await getPokemonList(initialLimit, offset);
        const detailed = await Promise.all(listData.results.map((p) => getPokemon(p.name)));
        
        if (requestId === currentRequestId.current) {
          setPokemon(prev => [...prev, ...detailed]);
          setOffset(offset + initialLimit);
          setHasMore(listData.results.length === initialLimit);
        }
      }
    } catch (err) {
      if (requestId === currentRequestId.current) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    } finally {
      if (requestId === currentRequestId.current) {
        setIsLoadingMore(false);
      }
    }
  };

  return { pokemon, isLoading, isLoadingMore, error, hasMore, loadMore };
};
