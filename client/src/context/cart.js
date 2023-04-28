// Copied everything over from searchjs in context, as a blueprint for the cart context.

import { useState, useContext, createContext } from "react";


const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);


    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}

// custom hook for this
const useCart = () => useContext(CartContext)

export { useCart, CartProvider };