import React from 'react';
import { useCart } from '../CartContext';
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-textPrimary mb-8">Carrinho de Compras</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Seu carrinho está vazio.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-2xl font-bold text-textPrimary">Total: ${total.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="mt-4 w-full bg-primary text-textLight py-3 rounded-lg 
                         hover:bg-secondary hover:scale-105 hover:shadow-lg 
                         transition-all duration-200 active:animate-pulse-btn cursor-pointer"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;