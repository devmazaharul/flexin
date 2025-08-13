'use client';
import { Lens } from '@/components/magicui/lens';
import { Button } from '@/components/ui/button';
import { appConfig } from '@/constant/app.config';
import { useCartStore } from '@/hook/persist';
import { productItems } from '@/types/product';
import { Heart, Minus, Plus, ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function Productdetails({ product }: { product: productItems }) {
  const { id, name, description, price, stock, discount, imageUrl, category,attributes } =
    product;

  const discountedPrice = price - (price * discount) / 100;
  const isAvailable = stock > 0;

  const cartStore = useCartStore();
  const isAlreadyInCart = cartStore.cart.find((item) => item.id === id);

  // Attributes sample


  // States to track selected color and size
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [save,setSave]=useState(false)

  // On mount, set default selected color and size to first items if exist
  useEffect(() => {
    const firstColor = attributes.find((attr) => attr.key === 'color')?.value || 'null';
    const firstSize = attributes.find((attr) => attr.key === 'size')?.value || 'null';
    if (firstColor) setSelectedColor(firstColor);
    if (firstSize) setSelectedSize(firstSize);
  }, []);

  const handleAddToCart = () => {
    cartStore.addToCart({
      ...product,
      quantity: 1,
      color:selectedColor,
      size:selectedSize,
      slug:""
    });
    toast.success('Your selection is now in the cart 🎉');
  };

  const handleIncrement = () => {
    if (isAlreadyInCart && stock === isAlreadyInCart.quantity) {
      toast.warning(`Only ${stock} in stock — you’ve reached the limit`);
      return;
    }
    cartStore.increment(id);
  };

  const handleDecrement = () => cartStore.decrement(id);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Product Image */}
        <div className="flex justify-center md:justify-start">
          <div className="rounded-2xl overflow-hidden p-4">
            <Lens lensSize={200} duration={0.2}>
              <Image
                src={imageUrl}
                alt={name}
                width={450}
                height={450}
                className="rounded-lg object-cover transition-transform duration-300 hover:scale-105"
              />
            </Lens>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-5">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {name}
          </h1>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{description} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium hic aut itaque cum quam iure aliquam ad asperiores reprehenderit qui!</p>

          {/* Price Section */}
          <div className="flex items-center gap-3">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-extrabold text-gray-600">
                  ${discountedPrice.toFixed(0)}
                </span>
                <span className="text-lg line-through text-gray-400">
                  ${price.toFixed(0)}
                </span>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 font-medium text-sm rounded-full">
                  -{discount}%
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-800">
                ${price.toFixed(0)}
              </span>
            )}
          </div>

          {/* Stock Badge */}
          <div>
            <span
              className={`text-sm font-medium px-3 py-1 rounded-md ${
                isAvailable
                  ? 'bg-green-400/20 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {isAvailable ? `In Stock (${stock})` : 'Out of Stock'}
            </span>
          </div>

          {/* Attributes */}
         {attributes && attributes.length>0 &&  <div className="mt-2">
            {/* Colors */}
            <ul className="mt-1 text-gray-600 flex gap-2 items-center">
              {attributes
                .filter((attr) => attr.key === 'color')
                .map((attr) => (
                  <li
                    key={attr.id}
                    tabIndex={0}
                    role="button"
                    onClick={() => setSelectedColor(attr.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedColor(attr.value);
                      }
                    }}
                    className={`
          w-6 h-6 rounded-xl cursor-pointer
 
          ${
            selectedColor === attr.value &&
            'outline-none ring-2 ring-offset-1 ring-gray-500 '
          }
          
        `}
                    style={{ backgroundColor: attr.value }}
                    title={attr.value}
                  />
                ))}
            </ul>

            {/* Sizes */}
            <ul className="mt-3 text-gray-600 flex gap-2 items-center flex-wrap">
              {attributes
                .filter((attr) => attr.key === 'size')
                .map((attr) => (
                  <li
                    key={attr.id}
                    tabIndex={0}
                    role="button"
                    onClick={() => setSelectedSize(attr.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedSize(attr.value);
                      }
                    }}
                    className={` py-1 border-2 px-4 rounded-md cursor-pointer font-semibold uppercase
                      focus:outline-none focus:ring-2 focus:ring-gray-400
                      ${
                        selectedSize === attr.value &&
                        'bg-gray-800  text-white border-gray-800'
                      }`}
                  >
                    {attr.value}
                  </li>
                ))}
            </ul>
          </div>}

          {/* Cart Actions */}
          <div className="mt-4">
            {!isAlreadyInCart ? (
              <div className='grid grid-cols-4 gap-2 w-fit'>
                <Button
                onClick={handleAddToCart}
                variant="default"
                className="flex items-center col-span-3 gap-2 cursor-pointer"
              >
                <ShoppingBasket className="w-5 h-5" />
                Add to Cart
              </Button>

                <Button
                onClick={()=>setSave(!save)}
                variant="outline"
                className="flex items-center col-span-1 gap-2 cursor-pointer"
              >
            <Heart size={25} className={`${save && 'fill-red-500 stroke-red-500'} stroke-1`} />

                
              </Button>
                </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  disabled={
                    isAlreadyInCart.quantity === appConfig.cartLimit.MIN
                  }
                  onClick={handleDecrement}
                  variant="secondary"
                  className="hover:bg-gray-200 cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-lg font-semibold w-10 text-center">
                  {isAlreadyInCart.quantity}
                </span>
                <Button
                  onClick={handleIncrement}
                  disabled={isAlreadyInCart.quantity >= stock}
                  variant="secondary"
                  className="hover:bg-gray-200 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Category */}
          <div className="mt-2 text-sm text-gray-500">
            Category: <span className="font-medium">{category.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
