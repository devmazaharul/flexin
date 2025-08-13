import { products } from "@/local.db";
import ProductCard from "./__sub/ProductCard";

export default async function ProductsList() {
  await new Promise((res)=>setTimeout(res,2000))
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-6">
          {products.map((item)=><ProductCard key={item.id} productInfo={({...item})}/>)}
    </div>
  )
}
