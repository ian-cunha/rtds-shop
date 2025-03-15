import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { Product } from '../types';
import { useCart } from '../CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // Estado para quantidade
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(Number(id));
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center py-10 text-textPrimary">Carregando...</div>;

  const handleAddToCart = () => {
    addToCart(product, quantity); // Passa a quantidade selecionada
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 h-96 object-contain rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-textPrimary mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
          <p className="text-2xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={decreaseQuantity}
              className="px-3 py-1 bg-primary text-textLight rounded-full 
                         hover:bg-secondary hover:scale-110 
                         transition-all duration-200 active:animate-bounce-btn cursor-pointer"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="text-lg font-medium text-textPrimary">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="px-3 py-1 bg-primary text-textLight rounded-full 
                         hover:bg-secondary hover:scale-110 
                         transition-all duration-200 active:animate-bounce-btn cursor-pointer"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary text-textLight py-3 rounded-lg 
                       hover:bg-secondary hover:scale-105 hover:shadow-lg 
                       transition-all duration-200 active:animate-pulse-btn cursor-pointer"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;