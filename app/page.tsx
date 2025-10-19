import React from 'react';
import { FeaturedProductList } from './Homecomponets/FeaturedProducts';
import Newarival from './Homecomponets/Newarival';
import { allProduct } from '@/server/controllers/product';
import Question from './__global_components/Question';


export default async function page() {
    const allproduct = await allProduct({
        isDiscount: false,
        isFeature: false,
    });

    if (allproduct.data.length == 0) return <h1>No product found</h1>;

    const FeaturedProducs = allproduct.data.filter((item) => item.isFeatured);
    const newArrivalProducts = allproduct.data
        .filter((item) => item.updatedAt)
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    return (
        <div className="leading-10">
            <FeaturedProductList products={FeaturedProducs} />
            <Question />
            <Newarival products={newArrivalProducts} />
        </div>
    );
}
