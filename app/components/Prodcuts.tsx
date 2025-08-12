'use client';
import { appConfig } from '@/constant/app.config';
import { allProduct } from '@/server/controllers/product';
import { productItems } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Prodcuts() {
  const [items, setitems] = useState<productItems[] | null>([]);
  useEffect(() => {
    allProduct({}).then(({ data }) => {
      return setitems(Array.isArray(data) ? data : []);
    });
  }, []);

  return (
    <div>
      <div>
        <h1>All products</h1>
      </div>

      <div className="grid grid-cols-4">
        {items &&
          items?.map((item) => (
            <Link href={appConfig.hostname.BASE_URL+"/product/"+item.id} key={item.id}>
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
            </Link>
          ))}
      </div>
    </div>
  );
}
