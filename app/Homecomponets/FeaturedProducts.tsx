import { allProduct } from '@/server/controllers/product';
import ProductCard from '../products/__sub/ProductCard';
import TopInfo from '../__global_components/TopInfo';
import TopsmallInfo from '../__global_components/TopsmallInfo';
import { productItems } from '@/types/product';

export  async function FeaturedProductList({products}:{products:productItems[]}) {

  if (products.length == 0)
    return <h1>No product found</h1>;


  return (
  <div>

      <TopsmallInfo title='Featured product' desc='All featured products here'/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-6">
      {products.map((item) => (
        <ProductCard key={item.slug} productInfo={{ ...item }} />
      ))}
    </div>
  </div>
  );
}
