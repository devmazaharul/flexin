import { productItems } from '@/types/product'
import React from 'react'
import ProductCard from '../products/__sub/ProductCard';
import TopsmallInfo from '../__global_components/TopsmallInfo';

export default function Newarival({products}:{products:productItems[]}) {
 
   if (products.length == 0)
     return <h1>No product found</h1>;
 
   return  <div>
       <TopsmallInfo title='new Arival product' desc='All new Arival products here'/>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-6">
       {products.map((item) => (
         <ProductCard key={item.slug} productInfo={{ ...item }} />
       ))}
     </div>
   </div>

}
