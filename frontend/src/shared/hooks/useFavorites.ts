import { useState, useEffect } from "react";

export type FavoriteItem = {
  id: string;
  type: "pet" | "volunteer";
  name: string;
  imageUrl: string;
  addedAt: string;
};

const FAVORITES_KEY = "pet_family_favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse favorites:", error);
        setFavorites([]);
      }
    }
    setIsLoaded(true);
  }, []);

  const addToFavorites = (item: Omit<FavoriteItem, "addedAt">) => {
    const newItem: FavoriteItem = {
      ...item,
      addedAt: new Date().toISOString(),
    };

    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === item.id);
      if (exists) {
        return prev;
      }

      const updated = [...prev, newItem];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromFavorites = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.filter((f) => f.id !== id);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (id: string) => {
    return favorites.some((f) => f.id === id);
  };

  const toggleFavorite = (item: Omit<FavoriteItem, "addedAt">) => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
      return false;
    } else {
      addToFavorites(item);
      return true;
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem(FAVORITES_KEY);
  };

  return {
    favorites,
    isLoaded,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  };
};