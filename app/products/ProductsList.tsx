import { products } from "@/local.db";
import ProductCard from "../__global_components/ProductCard";

export default function ProductsList() {
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-6">
          {products.map((item)=><ProductCard key={item.id} productInfo={({...item,quantity:0})}/>)}
    </div>
  )
}
