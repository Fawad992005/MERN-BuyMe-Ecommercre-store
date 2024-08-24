import React, { createContext, useState, useContext, useEffect } from "react";

const FavouritesContext = createContext();

export const useFavourites = () => useContext(FavouritesContext);

export const FavouritesProvider = ({ children }) => {
  const [favourites, setfavourites] = useState(() => {
    // Initialize cart from localStorage if available
    const savedfavourites = localStorage.getItem("favourites");
    return savedfavourites ? JSON.parse(savedfavourites) : [];
  });

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addtofavourites = (product) => {
    setfavourites((prevFavourites) => {
      // Check if product already exists in favourites
      if (!prevFavourites.find((item) => item._id === product._id)) {
        return [...prevFavourites, product];
      }
      return prevFavourites;
    });
  };

  const removefromfavourites = (productId) => {
    const updatedfavourites = favourites.filter((item) => (
      item._id !== productId
    ));
    setfavourites(updatedfavourites);
  };

  const value = {
    favourites,
    addtofavourites,
    removefromfavourites,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};
