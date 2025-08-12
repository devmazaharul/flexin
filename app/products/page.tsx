import React from 'react'
import TopInfo from '../__global_components/TopInfo'
import ProductsList from './ProductsList'

export default function page() {
  return (
    <div>
     <TopInfo title="Products" desc="Explore all available items at a glance" />


      <div>
        <ProductsList/>
      </div>
    </div>
  )
}
