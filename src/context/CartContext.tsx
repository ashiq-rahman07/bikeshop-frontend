
import { CartItem, Product } from "@/types";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";


interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalAmount: 0,
});

export const useCart = () => useContext(CartContext);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  useEffect(() => {
    // Load cart from local storage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error parsing stored cart data:", error);
      }
    }
  }, []);
  
  useEffect(() => {
    // Save cart to local storage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        const newQuantity = updatedItems[existingItemIndex].quantity + quantity;
        
        // Check if the new quantity exceeds the stock
        if (newQuantity > product.stock) {
          toast.error(`Sorry, only ${product.stock} items available`);
          return prevItems;
        }
        
        updatedItems[existingItemIndex].quantity = newQuantity;
        toast.success(`${product.name} quantity updated in cart`);
        return updatedItems;
      } else {
        // Add new item if it doesn't exist
        if (quantity > product.stock) {
          toast.error(`Sorry, only ${product.stock} items available`);
          return prevItems;
        }
        
        toast.success(`${product.name} added to cart`);
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.product.id === productId);
      if (itemToRemove) {
        toast.success(`${itemToRemove.product.name} removed from cart`);
      }
      return prevItems.filter(item => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.product.id === productId);
      
      if (itemIndex >= 0) {
        const product = prevItems[itemIndex].product;
        
        // Check if the new quantity is valid
        if (quantity <= 0) {
          toast.success(`${product.name} removed from cart`);
          return prevItems.filter(item => item.product.id !== productId);
        }
        
        // Check if the new quantity exceeds the stock
        if (quantity > product.stock) {
          toast.error(`Sorry, only ${product.stock} items available`);
          return prevItems;
        }
        
        // Update the quantity
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity = quantity;
        return updatedItems;
      }
      
      return prevItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared");
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalAmount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
