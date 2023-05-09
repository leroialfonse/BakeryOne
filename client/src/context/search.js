// Copied everything over from authjs in context, as a blueprint for the search context.

import { useState, useContext, createContext } from "react";


const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [auth, setAuth] = useState({

        keyword: '',
        results: [],

    });


    return (
        <SearchContext.Provider value={[auth, setAuth]}>
            {children}
        </SearchContext.Provider>
    )
}

// custom hook for this
const useSearch = () => useContext(SearchContext)

export { useSearch, SearchProvider };