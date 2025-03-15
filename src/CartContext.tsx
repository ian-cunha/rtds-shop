/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from './types';

interface Notification {
  message: string;
  id: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void; // Adicionamos quantity como opcional
  updateCartItem: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  notifications: Notification[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const loadCartFromStorage = (): CartItem[] => {
  const storedCart = localStorage.getItem('cartItems');
  return storedCart ? JSON.parse(storedCart) : [];
};

const saveCartToStorage = (items: CartItem[]) => {
  localStorage.setItem('cartItems', JSON.stringify(items));
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(loadCartFromStorage());
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addToCart = (product: Product, quantity: number = 1) => { // Quantidade padrão é 1
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      let updatedItems: CartItem[];
      if (existingItem) {
        updatedItems = prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updatedItems = [...prev, { ...product, quantity }];
      }
      saveCartToStorage(updatedItems);
      return updatedItems;
    });

    const notificationId = Date.now();
    setNotifications((prev) => [
      ...prev,
      { message: `${product.title} (${quantity}) foi adicionado ao carrinho`, id: notificationId },
    ]);
  };

  const updateCartItem = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) => {
      const updatedItems = prev.map((item) => (item.id === id ? { ...item, quantity } : item));
      saveCartToStorage(updatedItems);
      return updatedItems;
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => {
      const updatedItems = prev.filter((item) => item.id !== id);
      saveCartToStorage(updatedItems);
      return updatedItems;
    });
  };

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications((prev) => prev.slice(1));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateCartItem, removeFromCart, notifications }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};