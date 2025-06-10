
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Artwork, CartItem } from '../types/artwork';

interface CartState {
  items: CartItem[];
  wishlist: Artwork[];
  total: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Artwork }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: Artwork }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string };

interface CartContextType {
  state: CartState;
  addToCart: (artwork: Artwork) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (artwork: Artwork) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  generateWhatsAppMessage: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.artwork.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.artwork.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price
        };
      }
      return {
        ...state,
        items: [...state.items, { artwork: action.payload, quantity: 1 }],
        total: state.total + action.payload.price
      };

    case 'REMOVE_FROM_CART':
      const itemToRemove = state.items.find(item => item.artwork.id === action.payload);
      if (!itemToRemove) return state;
      
      return {
        ...state,
        items: state.items.filter(item => item.artwork.id !== action.payload),
        total: state.total - (itemToRemove.artwork.price * itemToRemove.quantity)
      };

    case 'UPDATE_QUANTITY':
      const item = state.items.find(item => item.artwork.id === action.payload.id);
      if (!item) return state;
      
      const quantityDiff = action.payload.quantity - item.quantity;
      return {
        ...state,
        items: state.items.map(item =>
          item.artwork.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + (item.artwork.price * quantityDiff)
      };

    case 'CLEAR_CART':
      return { ...state, items: [], total: 0 };

    case 'ADD_TO_WISHLIST':
      if (state.wishlist.some(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload]
      };

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload)
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    wishlist: [],
    total: 0
  });

  const addToCart = (artwork: Artwork) => {
    dispatch({ type: 'ADD_TO_CART', payload: artwork });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const addToWishlist = (artwork: Artwork) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: artwork });
  };

  const removeFromWishlist = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
  };

  const isInWishlist = (id: string) => {
    return state.wishlist.some(item => item.id === id);
  };

  const generateWhatsAppMessage = () => {
    if (state.items.length === 0) return '';
    
    let message = `Hi Aakhya, I want to buy:\n\n`;
    
    state.items.forEach((item, index) => {
      message += `${index + 1}. "${item.artwork.title}" - ₹${item.artwork.price.toLocaleString()}`;
      if (item.quantity > 1) {
        message += ` (Qty: ${item.quantity})`;
      }
      message += '\n';
    });
    
    message += `\nTotal: ₹${state.total.toLocaleString()}\n\nPlease share payment details and delivery information.`;
    
    return encodeURIComponent(message);
  };

  return (
    <CartContext.Provider value={{
      state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      generateWhatsAppMessage
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
