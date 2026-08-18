import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Pokemon } from '../types/pokemon';

interface FavoritesContextType {
  favorites: Pokemon[];
  addFavorite: (pokemon: Pokemon) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (pokemon: Pokemon) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Pokemon[]>(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (pokemon: Pokemon) => {
    setFavorites(prev => {
      if (prev.some(p => p.id === pokemon.id)) return prev;
      return [...prev, pokemon];
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites(prev => prev.filter(p => p.id !== id));
  };

  const isFavorite = (id: number) => {
    return favorites.some(p => p.id === id);
  };

  const toggleFavorite = (pokemon: Pokemon) => {
    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
