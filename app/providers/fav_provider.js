
import { createContext, useContext, useState } from "react";
const FavouriteContext = createContext([]);

export function FavouriteContextProvider({children}) {
    const [favourites, setFavourites] = useState([]);
    const isFavourite = (id) => {
        return favourites.findIndex(item => item.id == id) > -1;
    }

    const toggleFavourite = (data) => {
        const id = data.id
        const existed = isFavourite(id)
        if(existed) {
            setFavourites((prevItems) => prevItems.filter((value) => value.id != id ))
        } else {
            setFavourites((prevItems) => [...prevItems, data])
        }
    }

    return (
        <FavouriteContext.Provider value={{favourites, isFavourite, toggleFavourite, setFavourites}}>
            {children}
        </FavouriteContext.Provider>
    );
}

export function useFavourites() {
    return useContext(FavouriteContext);
}

