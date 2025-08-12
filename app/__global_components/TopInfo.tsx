import React from "react";

export default function TopInfo({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="text-center px-4 py-6 max-w-2xl mx-auto">
      <h1 className="text-3xl capitalize font-bold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h1>
      <p className=" text-base text-gray-500  ">
        {desc}
      </p>
      <div className="mt-2 h-1 w-30 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mx-auto" />
    </div>
  );
}
