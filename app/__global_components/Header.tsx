import Link from 'next/link';
import React from 'react';
import SearchMenu from './Search';
import CartsMenu from './CartsMenu';
import { Borel } from 'next/font/google';

const logoFont = Borel({
  weight: '400',
  style: 'normal',
  subsets: ['vietnamese'],
});

export default function Header() {
  return (
    <div className="flex items-center justify-between h-17">
      <div>
        <Link href={'/'}>
          <h1 className={`${logoFont.className} text-2xl font-bold`}>FlexIn</h1>
        </Link>
      </div>

      {/* searchBar */}
      <div>
        <SearchMenu />
      </div>
      {/* carts and others */}
      <div>
        <CartsMenu />
      </div>
    </div>
  );
}
