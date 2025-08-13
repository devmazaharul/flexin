import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='h-screen items-center w-full flex text-center'>
      <Button variant={"default"}>
        <Link href={'/products'}>Products</Link>
      </Button>
    </div>
  )
}
