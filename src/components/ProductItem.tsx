import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../CartContext';

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate-slide-up">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain mb-4 transform hover:scale-105 transition-transform duration-300"
        />
        <h3 className="text-lg font-semibold text-textPrimary truncate">{product.title}</h3>
      </Link>
      <p className="text-primary font-bold mt-2">${product.price.toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        className="mt-4 w-full bg-primary text-textLight py-2 rounded-lg 
                   hover:bg-secondary hover:scale-105 hover:shadow-lg 
                   transition-all duration-200 active:animate-pulse-btn cursor-pointer"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default ProductItem;