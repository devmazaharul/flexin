import { allProduct } from '@/server/controllers/product';
import ProductCard from './__sub/ProductCard';

export default async function ProductsList() {
  const products = await allProduct({
    isDiscount: false,
    isFeature: false,
  });
  if (products.status !== 200 || products.data.length == 0)
    return <h1>No product found</h1>;



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-6">
      {products.data.map((item) => (
        <ProductCard key={item.slug} productInfo={{ ...item }} />
      ))}
    </div>
  );
}
