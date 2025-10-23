import React from 'react'

export default function TopsmallInfo({title,desc}:{title:string;desc:string}) {
  return (
   <div className=" p-3 rounded-lg text-center">
  <p className="text-3xl font-semibold text-gray-800 capitalize">{title || "product"}</p>
  <p className="text-gray-500 text-xs">{desc || "All  products here"}</p>
</div>
  )
}
