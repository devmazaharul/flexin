
import { shuffleInProducts } from '@/utils/algorithm';
import React from 'react';
import ProductCard from './ProductCard';
import { allProduct } from '@/server/controllers/product';

export default async function SuffledProducts() {
  const getProdcuts=await allProduct({
    isDiscount: false,
    isFeature: false,
  });
  const sortedProducts = shuffleInProducts(getProdcuts.data).slice(0, 6);

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
