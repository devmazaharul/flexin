'use client';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/hook/persist';
import { addToCartitems } from '@/types/product';
import { ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';

export default function ProductCard() {
  const products = [
    {
      id: '1',
      name: 'Iphone 12 Pro Max',
      price: 17883,
      stock: 120,
      description: 'This is an awesome phone with great performance.',
      imageUrl: 'https://m.media-amazon.com/images/I/715XNT3XEpL._SL1500_.jpg',
      category: 'baby',
      discount: 0,
    },
    {
      id: '2',
      name: 'Samsung Galaxy S23 Ultra',
      price: 21000,
      stock: 85,
      description: 'Flagship Android phone with amazing camera quality.',
      imageUrl:
        'https://beautysiaa.com/wp-content/uploads/2022/12/Cosrx-Salicylic-Acid-Daily-Gentle-Cleanser-150ml-300x300.jpg',
      category: 'electronics',
      discount: 15,
    },
    {
      id: '3',
      name: 'Sony WH-1000XM5 Headphones',
      price: 9800,
      stock: 60,
      description: 'Premium noise-cancelling wireless headphones.',
      imageUrl:
        'https://m.media-amazon.com/images/I/71Wbdf1ML-L._UF1000,1000_QL80_.jpg',
      category: 'audio',
      discount: 20,
    },
    {
      id: '4',
      name: 'Nike Air Max 270',
      price: 7500,
      stock: 200,
      description: 'Comfortable and stylish sneakers for everyday wear.',
      imageUrl:
        'https://cdn.klassy.com.bd/uploads/products/products/Mistine-Acne-Clear-Face-wash-85g-03ba-products.webp',
      category: 'fashion',
      discount: 5,
    },
    {
      id: '5',
      name: 'Apple MacBook Air M2',
      price: 28000,
      stock: 40,
      description: "Lightweight laptop with Apple's latest M2 chip.",
      imageUrl:
        'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/him/him50047/y/29.jpg',
      category: 'computers',
      discount: 12,
    },
    {
      id: '6',
      name: 'Logitech MX Master 3 Mouse',
      price: 4500,
      stock: 5,
      description: 'Ergonomic wireless mouse with precision tracking.',
      imageUrl:
        'https://cdn2.arogga.com/eyJidWNrZXQiOiJhcm9nZ2EiLCJrZXkiOiJQcm9kdWN0LXBfaW1hZ2VzXC82NzcxM1wvNjc3MTMtMS00LTdlM2w0dy5wbmciLCJlZGl0cyI6W119',
      category: 'accessories',
      discount: 8,
    },
  ];

  const { addToCart, increment, decrement, cart } = useCartStore();

  const handleCart = (item: addToCartitems) => {
    addToCart({
      ...item,
    });
    toast.success('Added to cart');
  };
  console.log(cart);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-6">
      {products.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl overflow-hidden shadow-2xl shadow-[#e8eaed] hover:shadow-2xl transition-shadow duration-300 border border-gray-200/20"
        >
          {/* Image Section - Clickable */}
          <Link
            href={`/product/${encodeURIComponent(item.name)}`}
            className="relative w-full h-56 bg-gray-50 flex items-center justify-center"
          >
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={180}
              height={180}
              className="object-contain"
            />
            {item.discount > 0 && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-sm ">
                {item.discount}% OFF
              </span>
            )}
          </Link>

          {/* Content Section */}
          <div className="p-4 flex flex-col flex-1">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {item.name}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {item.description}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xl font-bold text-gray-800">
                ${item.price}
              </span>
              <span
                className={`${
                  item.stock > 10 ? 'text-gray-500' : 'text-red-500'
                } text-xs`}
              >
                {item.stock} in stock
              </span>
            </div>

            <div className="flex-1"></div>

            <Button
              onClick={() =>
                handleCart({
                  id: item.id,
                  name: item.name,
                  description: item.description,
                  imageUrl: item.imageUrl,
                  discount: item.discount,
                  price: item.price,
                  stock: item.stock,
                  quantity: 0,
                  isActive:
                    Math.floor(Math.random() * 100) % 2 == 0 ? true : false,
                  isFeatured: false,
                  updatedAt: new Date(),
                  category: {
                    id: Math.random().toString(),
                    name: item.category,
                  },
                })
              }
              variant={'secondary'}
              className="mt-3 cursor-pointer hover:bg-gray-200 w-full"
            >
              <ShoppingBasket /> Add to cart
            </Button>

          </div>
        </div>
      ))}
    </div>
  );
}
