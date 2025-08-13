import { products } from '@/local.db';
import Productdetails from '../__sub/Productdetails';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ productid: string }> }) {
  const { productid } = await params;
  const findProduct = products.find(item => item.slug === productid.trim());

  if (!findProduct) return notFound();

  return <Productdetails product={findProduct} />;
}
