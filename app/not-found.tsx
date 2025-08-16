'use client';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-extrabold text-gray-800 mb-4">404</h1>

      <p className="text-md text-gray-600 mb-8">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      

      <Link href="/">
        <Button variant={'default'} className='cursor-pointer'>
          {' '}
          <Home size={18} /> Go Back Home
        </Button>
      </Link>
    </div>
  );
}
