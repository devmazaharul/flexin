import Link from 'next/link';
import React from 'react';
import SearchMenu from './Search';
import CartsMenu from './CartsMenu';
import { Borel } from 'next/font/google';

const logoFont = Borel({
  style: 'normal',
  subsets: ['vietnamese'],
  weight:"400"
});

export default function Header() {
  return (
    <div className="flex items-center justify-between h-17 px-4 md:px-8">
      {/* Logo */}
      <div>
        <Link href={'/'}>
          <h1
            className={`${logoFont.className} text-2xl `}
          >
            FlexIn
          </h1>
        </Link>
      </div>

      {/* Search Bar */}
      <div className=" hidden md:block">
        <SearchMenu />
      </div>

      {/* Carts and Others */}
      <div>
        <CartsMenu />
      </div>
    </div>
  );
}
