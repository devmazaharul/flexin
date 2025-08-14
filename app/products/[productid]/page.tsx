import { products } from '@/local.db';
import Productdetails from '../__sub/Productdetails';
import { notFound } from 'next/navigation';
import SuffledProducts from '../__sub/SuffledProducts';

export default async function Page({ params }: { params: Promise<{ productid: string }> }) {
  const { productid } = await params;
  const findProduct = products.find(item => item.slug === productid.trim());

  if (!findProduct) return notFound();

  return <>
  <Productdetails product={findProduct} />

<div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Related products</h2>
        {/* Pass the current product so SuffledProducts can exclude it */}
        <SuffledProducts />
      </div>

  </>
}
