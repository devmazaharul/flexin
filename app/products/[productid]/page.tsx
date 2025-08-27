import Productdetails from '../__sub/Productdetails';
import { notFound } from 'next/navigation';
import SuffledProducts from '../__sub/SuffledProducts';
import { findProductWithSlug } from '@/server/controllers/product';

export default async function Page({
  params,
}: {
  params: Promise<{ productid: string }>;
}) {
  const { productid } = await params;
  const findProduct = await findProductWithSlug(productid);
  if(!findProduct || findProduct.status!==200) return notFound();


  return (
    <>
      <Productdetails product={findProduct.data} />
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Related products</h2>
        {/* Pass the current product so SuffledProducts can exclude it */}
        <SuffledProducts />
      </div>
    </>
  );
}
