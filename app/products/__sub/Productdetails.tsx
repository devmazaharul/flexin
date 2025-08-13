'use client';
import { Lens } from '@/components/magicui/lens';
import { Button } from '@/components/ui/button';
import { appConfig } from '@/constant/app.config';
import { useCartStore } from '@/hook/persist';
import { productItems } from '@/types/product';
import QRCode from 'react-qr-code';
import {
  Heart,
  Minus,
  Palette,
  Plus,
  Ruler,
  ShoppingBasket,
  Star,
  Truck,
} from 'lucide-react';
import Image from 'next/image';
import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import useWishStore from '@/hook/useWishStore';

export default function Productdetails({ product }: { product: productItems }) {
  const {
    id,
    name,
    description,
    price,
    stock,
    discount,
    imageUrl,
    category,
    attributes
  } = product;
  const wishStore=useWishStore()
  const cartStore = useCartStore();
  const isAlreadyInCart = cartStore.cart.find((item) => item.id === id);
  const isAlreadyInWish=wishStore.wishlist.find((item)=>item.id==id)
  // ---- Derived values
  const discountedPrice = useMemo(
    () => price - (price * discount) / 100,
    [price, discount]
  );
  const isAvailable = stock > 0;
  const hasColors = attributes?.some((a) => a.key === 'color');
  const hasSizes = attributes?.some((a) => a.key === 'size');

  // ---- Local UI state
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [qty] = useState<number>(1);

  // Default select first color/size on mount
  useEffect(() => {
    const firstColor = attributes?.find((attr) => attr.key === 'color')?.value;
    const firstSize = attributes?.find((attr) => attr.key === 'size')?.value;
    if (firstColor) setSelectedColor(firstColor);
    if (firstSize) setSelectedSize(firstSize);
  }, [attributes]);

  // Disable Add to Cart if variant required but not selected
  const variantMissing =
    (hasColors && !selectedColor) || (hasSizes && !selectedSize);

  // ---- Actions
  const handleAddToCart = () => {
    if (variantMissing) {
      toast.warning('Please select all required options (color/size).');
      return;
    }

    cartStore.addToCart({
      ...product,
      quantity: qty,
      color: selectedColor || undefined,
      size: selectedSize || undefined,
    });

    toast.success('Added to cart 🎉');
  };

  const handleIncrementCart = () => {
    if (isAlreadyInCart && isAlreadyInCart.quantity >= stock) {
      toast.warning(`Only ${stock} in stock — limit reached`);
      return;
    }
    cartStore.increment(id);
  };

  const handleDecrementCart = () => cartStore.decrement(id);



  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left: Media */}
        <div className="flex justify-center md:justify-start">
          <div className="rounded-2xl overflow-hidden p-4 bg-white ">
            <Lens lensSize={200} zoomFactor={2} duration={0.2}>
              <Image
                src={imageUrl}
                alt={name}
                width={480}
                height={480}
                className="rounded-xl object-cover transition-transform duration-300 hover:scale-105"
                priority
              />
            </Lens>
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex flex-col gap-5">
          {/* Breadcrumb-ish meta */}
          <div className="text-xs text-gray-500">
            <span className="capitalize">{category?.name}</span>
            <span className="mx-2">•</span>
            <span>SKU: {id.slice(0, 8).toUpperCase()}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {name}
          </h1>

          {/* Rating (placeholder) */}
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
            <Star className="w-4 h-4 stroke-yellow-400" />
            <span className="ml-1">(128 reviews)</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{description}</p>

          {/* Price */}
          <div className="flex items-end gap-3">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-extrabold text-gray-800">
                  €{discountedPrice.toFixed(0)}
                </span>
                <span className="text-lg line-through text-gray-400">
                  €{price.toFixed(0)}
                </span>
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 font-medium text-sm rounded-md">
                  -{discount}%
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-800">
                €{price.toFixed(0)}
              </span>
            )}
          </div>

          {/* Stock & shipping hint */}
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-md ${
                isAvailable
                  ? 'bg-green-500/10 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {isAvailable ? `In Stock (${stock})` : 'Out of Stock'}
            </span>
            {isAvailable && stock <= 3 && (
              <span className="text-xs text-amber-600">
                Hurry—only {stock} left!
              </span>
            )}
            <span className="text-xs text-gray-500">
              Free returns within 7 days
            </span>
          </div>

          {/* Attributes */}
          {attributes && attributes.length > 0 && (
            <div className="mt-3 space-y-4 leading-relaxed">
              {/* Color */}
              {hasColors && (
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Palette className="w-4 h-4 text-gray-500" />
                    <span className="font-semibold">Color</span>
                    {selectedColor ? (
                      <span className="inline-flex items-center gap-2 ml-2 text-xs rounded-full bg-gray-100 px-2 py-0.5">
                        <span
                          aria-hidden
                          className="inline-block w-3.5 h-3.5 rounded-full border border-gray-300"
                          style={{ backgroundColor: selectedColor }}
                        />
                        <span className="font-medium capitalize">
                          {selectedColor}
                        </span>
                      </span>
                    ) : (
                      <span className="ml-2 text-xs text-gray-400">
                        Choose a color
                      </span>
                    )}
                  </div>

                  <ul className="mt-2 flex flex-wrap items-center gap-2">
                    {attributes
                      .filter((attr) => attr.key === 'color')
                      .map((attr) => (
                        <li
                          key={attr.id}
                          tabIndex={0}
                          role="button"
                          aria-label={`Select color ${attr.value}`}
                          onClick={() => setSelectedColor(attr.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ')
                              setSelectedColor(attr.value);
                          }}
                          className={`w-7 h-7 rounded-full cursor-pointer  transition
                           
                            ${
                              selectedColor === attr.value &&
                              'outline-none ring-2 ring-offset-1 ring-gray-400 '
                            }`}
                          style={{ backgroundColor: attr.value }}
                          title={attr.value}
                        />
                      ))}
                  </ul>
                </div>
              )}

              {/* Size */}
              {hasSizes && (
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Ruler className="w-4 h-4 text-gray-500" />
                    <span className="font-semibold">Size</span>
                    {selectedSize ? (
                      <span className="ml-2 inline-flex items-center text-xs font-medium rounded-full bg-gray-900 text-white px-2 py-0.5 uppercase">
                        {selectedSize}
                      </span>
                    ) : (
                      <span className="ml-2 text-xs text-gray-400">
                        Choose a size
                      </span>
                    )}
                  </div>

                  <ul className="mt-2 flex flex-wrap items-center gap-2">
                    {attributes
                      .filter((attr) => attr.key === 'size')
                      .map((attr) => (
                        <li
                          key={attr.id}
                          tabIndex={0}
                          role="button"
                          aria-label={`Select size ${attr.value}`}
                          onClick={() => setSelectedSize(attr.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ')
                              setSelectedSize(attr.value);
                          }}
                          className={`px-3 py-1.5 rounded-md border-2 text-xs md:text-sm font-semibold uppercase
                            transition focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer
                            ${
                              selectedSize === attr.value
                                ? 'bg-gray-900 text-white border-gray-900'
                                : 'border-gray-300 hover:border-gray-400 text-gray-700'
                            }`}
                        >
                          {attr.value}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="mt-2 space-y-3">
            {/* Add / Wishlist or Cart controls */}
            {isAlreadyInCart ? (
              <div className="flex items-center gap-2">
                <Button
                  disabled={
                    isAlreadyInCart.quantity === appConfig.cartLimit.MIN
                  }
                  onClick={handleDecrementCart}
                  variant="secondary"
                  className="hover:bg-gray-200 cursor-pointer"
                >
                  <Minus className="w-4 h-4 " />
                </Button>
                <span className="text-lg font-semibold w-10 text-center">
                  {isAlreadyInCart.quantity}
                </span>
                <Button
                  onClick={handleIncrementCart}
                  disabled={isAlreadyInCart.quantity >= stock}
                  variant="secondary"
                  className="hover:bg-gray-200 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 w-fit">
                <Button
                  onClick={handleAddToCart}
                  variant="default"
                  disabled={!isAvailable || variantMissing}
                  className="flex items-center col-span-3 gap-2 cursor-pointer"
                >
                  <ShoppingBasket className="w-5 h-5" />
                  {variantMissing ? 'Select options' : 'Add to Cart'}
                </Button>
                <Button
                  onClick={()=>wishStore.toggle(product)}
                  variant="outline"
                  className="flex items-center col-span-1 justify-center cursor-pointer"
                  title={isAlreadyInWish ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart
                    className={`${
                      isAlreadyInWish ? 'fill-red-500 stroke-red-500' : ''
                    } stroke-1`}
                    size={22}
                  />
                </Button>
              </div>
            )}
          </div>

          {/* Footer meta */}
          <div className="mt-2 text-xs text-gray-600 flex items-center gap-1">
            <Truck size={16} /> Delivery in 2–5 days • Cash on Delivery
            available
          </div>

          <div>
            <QRCode size={80} value={`${appConfig.hostname.BASE_URL}/products/${product.slug}`} viewBox={`0 0 256 256`} /> <span className='text-xs'>Scan now</span>
          </div>
        </div>
      </div>
    </div>
  );
}
