import { singleProduct } from '@/server/controllers/product'
import Image from 'next/image'
import React from 'react'

export default async function page({params}:{params:{id:string}}) {
  const id=params.id
  const item=await (await singleProduct(id)).data

  return <div>

              <div >
                <Image
                  src={item.imageUrl}
                  width={200}
                  height={200}
                  alt="poroduc uimg"
                />
                <h1>{item.name}</h1>

                <small>{item.price}</small>
              </div>

  </div>
}
