
import React, { Suspense } from 'react'
import OrderSuccess from './OrderInfo';

export default async function page() {
    // const orderInfoRaw = await getOrderInfoWithUserId('ORD-2025082677e2b4a3');


    return (
      <div>
        <Suspense fallback={'loading...'}>
          <OrderSuccess />
        </Suspense>
      </div>
    )
}
