'use client';
import { Button } from '@/components/ui/button';
import { appConfig } from '@/constant/app.config';
import { useCartStore } from '@/hook/persist';
import { productItems } from '@/types/product';
import { Minus, Plus, ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';

export default function ProductCard({
  productInfo,
}: {
  productInfo: productItems;
}) {
  const { id, name, description, price, stock, discount, imageUrl,slug } =
    productInfo;

  const addtocartAction = useCartStore();

  const isAlreadyinCart = addtocartAction.cart.find((item) => item.id == id);

  const handleAddtoCart = () => {
    addtocartAction.addToCart({
      ...productInfo,
      quantity: 1,
      size:'ss',
      color:'dld',
      slug:"sls"
    });
    toast.success('Your selection is now in the cart 🎉');
  };

  const handleIncrement = () => {
    if (isAlreadyinCart && stock === isAlreadyinCart.quantity) {
      toast.warning(`Only ${stock} in stock — you’ve reached the limit`);
      return;
    }

    addtocartAction.increment(id);
  };

  const handleDecrement = () => addtocartAction.decrement(id);

  return (
    <div
      key={id}
      className="bg-white rounded-2xl overflow-hidden shadow-2xl shadow-[#e8eaed] hover:shadow-2xl transition-shadow duration-300 border border-gray-300/20"
    >
      <Link
        href={`/products/${encodeURIComponent(slug || 'd')}`}
        className="relative w-full h-56 bg-gray-50 flex items-center justify-center"
      >
        <Image
          src={imageUrl}
          alt={name}
          width={180}
          height={180}
          className="object-contain"
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-sm ">
            {discount}% OFF
          </span>
        )}
      </Link>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-col">
            {discount > 0 ? (
              <>
                <span className="text-xl font-bold text-gray-800">
                  €{(price - (price * discount) / 100).toFixed(0)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  €{price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-800">
                €{price.toFixed(0)}
              </span>
            )}
          </div>

          <span
            className={`${
              stock > 10 ? 'text-gray-500' : 'text-red-500'
            } text-xs`}
          >
            {stock} in stock
          </span>
        </div>

        <div className="flex-1"></div>

        {/* cart acton */}
        <div>
          {/*  add to cart this product */}
          {!isAlreadyinCart && (
            <Button
              onClick={handleAddtoCart}
              variant={'secondary'}
              className="mt-3 cursor-pointer hover:bg-gray-200 w-full"
            >
              <ShoppingBasket /> Add to cart
            </Button>
          )}

          {/* already added this product in cart */}
          {isAlreadyinCart && (
            <div className="flex items-center justify-between">
              <Button
                disabled={isAlreadyinCart.quantity == appConfig.cartLimit.MIN}
                onClick={handleDecrement}
                variant={'secondary'}
                className="mt-3 cursor-pointer hover:bg-gray-200 w-[33%]"
              >
                <Minus />
              </Button>
              <button className="mt-3 text-sm font-semibold cursor-text w-[20%] border-none bg-none">
                {isAlreadyinCart.quantity}
              </button>
              <Button
                onClick={handleIncrement}
                disabled={isAlreadyinCart.quantity == stock + 1}
                variant={'secondary'}
                className="mt-3 cursor-pointer hover:bg-gray-200 w-[33%]"
              >
                <Plus />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
