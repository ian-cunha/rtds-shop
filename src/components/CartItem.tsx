import React from 'react';
import { CartItem as CartItemType } from '../types';
import { useCart } from '../CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCart();

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4">
      <div>
        <h3 className="text-lg font-semibold text-textPrimary">{item.title}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => updateCartItem(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="px-3 py-1 bg-primary text-textLight rounded-full 
                     hover:bg-secondary hover:scale-110 
                     transition-all duration-200 active:animate-bounce-btn cursor-pointer"
        >
          -
        </button>
        <span className="text-lg font-medium text-textPrimary">{item.quantity}</span>
        <button
          onClick={() => updateCartItem(item.id, item.quantity + 1)}
          className="px-3 py-1 bg-primary text-textLight rounded-full 
                     hover:bg-secondary hover:scale-110 
                     transition-all duration-200 active:animate-bounce-btn cursor-pointer"
        >
          +
        </button>
        <button
          onClick={() => removeFromCart(item.id)}
          className="bg-primary text-textLight px-4 py-1 rounded-lg 
                     hover:bg-secondary hover:scale-105 
                     transition-all duration-200 active:animate-pulse-btn cursor-pointer"
        >
          Remover
        </button>
      </div>
    </div>
  );
};

export default CartItem;