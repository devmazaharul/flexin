import { products } from '@/local.db';
import { shuffleInProducts } from '@/utils/algorithm';
import React from 'react';
import ProductCard from './ProductCard';

export default function SuffledProducts() {
  const sortedProducts = shuffleInProducts(products).slice(0, 6);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-6">
        {sortedProducts.map((item) => (
          <ProductCard key={item.id} productInfo={{ ...item }} />
        ))}
      </div>
    </>
  );
}
