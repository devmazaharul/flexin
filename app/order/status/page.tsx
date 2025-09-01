
import React, { Suspense } from 'react'
import OrderSuccess from './OrderInfo'


export default async function page() {


    return (
      <div>
        <Suspense fallback={'loading...'}>
          <OrderSuccess />
        </Suspense>
      </div>
    )
}
