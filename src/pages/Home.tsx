import React, { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { getProducts } from '../services/api';
import ProductItem from '../components/ProductItem';
import { Product } from '../types';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { ref, inView } = useInView({ threshold: 0 });

  const loadProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newProducts = await getProducts(10, (page - 1) * 10);
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  useEffect(() => {
    if (products.length === 0) {
      loadProducts();
    }
  }, [loadProducts, products.length]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadProducts();
    }
  }, [inView, hasMore, loading, loadProducts]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-textPrimary mb-8 text-center">Nossos Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      {hasMore && (
        <div ref={ref} className="text-center py-6">
          {loading ? (
            <div className="flex justify-center items-center">
              <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h-8z" />
              </svg>
            </div>
          ) : (
            <span className="text-gray-500">Role para carregar mais</span>
          )}
        </div>
      )}
      {!hasMore && products.length > 0 && (
        <div className="text-center py-6 text-gray-500 font-medium">
          Você chegou ao fim da lista!
        </div>
      )}
    </div>
  );
};

export default Home;