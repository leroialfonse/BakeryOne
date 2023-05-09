// Copied everything over from searchjs in context, as a blueprint for the cart context.

import { useState, useContext, createContext, useEffect } from "react";




const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Need a useEffect here to preserve items in the cart in local stoarge, to maintin through refreshes.
    useEffect(() => {
        let existingCartItem = localStorage.getItem('cart')
        // If there's a thing in the cart, JSONparse will record it.
        if (existingCartItem) setCart(JSON.parse(existingCartItem))
    }, [])

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}

// custom hook for this
const useCart = () => useContext(CartContext)

export { useCart, CartProvider };