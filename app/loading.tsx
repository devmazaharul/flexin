"use client";

import { Loader } from "./__global_components/Loader";


export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 z-50">
      <Loader color="black" size="45" />
    </div>
  );
}
