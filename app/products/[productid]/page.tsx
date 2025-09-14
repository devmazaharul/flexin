import Productdetails from '../__sub/Productdetails';
import { notFound } from 'next/navigation';
import SuffledProducts from '../__sub/SuffledProducts';
import { findProductWithSlug } from '@/server/controllers/product';
import type { Metadata } from 'next';
import { appConfig } from '@/constant/app.config';

export async function generateMetadata({params}: {params: Promise<{ productid: string }>}): Promise<Metadata> {

  const { productid } =await params;
  const findProduct = await findProductWithSlug(productid);

  if (!findProduct || findProduct.status !== 200) {
    return {
      title: 'Product not found | Flexin',
      description: 'This product does not exist in our store.',
    };
  }

  const product = findProduct.data;

  return {
    title: `${product.name} | Flexin`,
    description: product.description?.slice(0, 160) ?? 'Check out this product on Flexin!',
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 160),
      url: `${appConfig.hostname.BASE_URL}/product/${product.slug}`,
      siteName: 'Flexin',
      images: [
        {
          url: product.imageUrl || '/default-product.jpg',
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      locale: 'en_US',
      type: 'website',
      
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description?.slice(0, 160),
      images: [product.imageUrl || '/default-product.jpg'],
    },
  };
}

export default async function Page({
  params,
}: {
params: Promise<{ productid: string }>;
}) {
  const { productid } =await params;
  const findProduct = await findProductWithSlug(productid);

  if (!findProduct || findProduct.status !== 200) return notFound();



  return (
    <>
      <Productdetails product={findProduct.data} />
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Related products</h2>
        <SuffledProducts productid={productid}/>
      </div>
    </>
  );
}
