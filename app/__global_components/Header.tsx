import { SparklesText } from '@/components/magicui/sparkles-text';
import Link from 'next/link';
import React from 'react';
import SearchMenu from './Search';
import CartsMenu from './CartsMenu';

export default function Header() {
  return (
    <div className="flex items-center justify-between h-15">
      <div>
        <h1>
          <Link href={'/'} className="text-xl font-semibold">
            <SparklesText sparklesCount={5}>FlexIn</SparklesText>
          </Link>
        </h1>
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
