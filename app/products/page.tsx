// app/products/page.tsx
export const dynamic = 'force-dynamic'; // build-time static নয়
export const runtime = 'nodejs';        // Prisma Edge runtime সাপোর্ট করে না

import React, { Suspense } from 'react';
import TopInfo from '../__global_components/TopInfo';
import ProductsList from './ProductsList';
import { ProductsSkeletonGrid } from './__sub/Productskeleton';


export default function page() {
  return (
    <div>
      <TopInfo
        title="Products"
        desc="Explore all available items at a glance"
      />
      <div>
        <Suspense fallback={<ProductsSkeletonGrid len={12} />}>
          <ProductsList />
        </Suspense>
      </div>
    </div>
  );
}
