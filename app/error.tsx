'use client'

import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function Error({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6  text-center">
      <AlertTriangle className="w-12 h-12 text-gray-600 mb-4" />
      <h1 className="text-2xl font-bold text-gray-700 mb-2">Something went wrong</h1>
      <p className="text-gray-600 text-sm">{message || 'An unexpected error occurred.'}</p>
      <br />
      <Button
        onClick={() => location.reload()}
      variant={"destructive"}
      className='cursor-pointer'
      >
        Reload Page
      </Button>
    </div>
  );
}
