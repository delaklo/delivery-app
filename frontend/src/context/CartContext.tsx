import { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartState, Product } from '../types';

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; shopId: string; shopName: string } }
  | { type: 'SET_ITEM'; payload: { product: Product; shopId: string; shopName: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  cart: CartState;
  addItem: (product: Product, shopId: string, shopName: string) => void;
  setItem: (product: Product, shopId: string, shopName: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
}

const initialState: CartState = { items: [], shopId: null, shopName: null };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, shopId, shopName } = action.payload;
      if (state.shopName && state.shopName !== shopName) {
        return { shopId, shopName, items: [{ product, quantity: 1 }] };
      }
      const existing = state.items.find(i => i.product._id === product._id);
      if (existing) {
        return { ...state, shopId, shopName, items: state.items.map(i => i.product._id === product._id ? { ...i, quantity: i.quantity + 1 } : i) };
      }
      return { shopId, shopName, items: [...state.items, { product, quantity: 1 }] };
    }
    case 'SET_ITEM': {
      const { product, shopId, shopName, quantity } = action.payload;
      if (quantity <= 0) return state;
     
      if (state.shopName && state.shopName !== shopName) {
        return { shopId, shopName, items: [{ product, quantity }] };
      }
      
      const existing = state.items.find(i => i.product._id === product._id);
      if (existing) {
        return { ...state, shopId, shopName, items: state.items.map(i => i.product._id === product._id ? { ...i, quantity: i.quantity + quantity } : i) };
      }
      return { ...state, shopId, shopName, items: [...state.items, { product, quantity }] };
    }
    case 'REMOVE_ITEM': {
      const items = state.items.filter(i => i.product._id !== action.payload);
      return { ...state, items, shopId: items.length === 0 ? null : state.shopId, shopName: items.length === 0 ? null : state.shopName };
    }
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        const items = state.items.filter(i => i.product._id !== productId);
        return { ...state, items, shopId: items.length === 0 ? null : state.shopId, shopName: items.length === 0 ? null : state.shopName };
      }
      return { ...state, items: state.items.map(i => i.product._id === productId ? { ...i, quantity } : i) };
    }
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product: Product, shopId: string, shopName: string) =>
    dispatch({ type: 'ADD_ITEM', payload: { product, shopId, shopName } });

  const setItem = (product: Product, shopId: string, shopName: string, quantity: number) =>
    dispatch({ type: 'SET_ITEM', payload: { product, shopId, shopName, quantity } });

  const removeItem = (productId: string) =>
    dispatch({ type: 'REMOVE_ITEM', payload: productId });

  const updateQuantity = (productId: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const totalPrice = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addItem, setItem, removeItem, updateQuantity, clearCart, totalPrice, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
