import { getOrderInfoWithUserId } from '@/server/controllers/order';
import React, { Suspense } from 'react'
import OrderSuccess, { orderRes } from './OrderInfo';

export default async function page() {
    const orderInfoRaw:orderRes = await getOrderInfoWithUserId('ORD-2025082677e2b4a3');
    // Ensure orderInfo has all required properties


  
  return (
    <div>
     <Suspense fallback={'loading...'}>
       <OrderSuccess orderinfo={orderInfoRaw}/>
     </Suspense>
    </div>
  )
}
