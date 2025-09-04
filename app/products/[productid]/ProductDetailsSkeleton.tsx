"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left: Image skeleton */}
        <div className="flex justify-center md:justify-start">
          <div className="rounded-2xl overflow-hidden p-4 bg-white">
            <Skeleton className="h-[480px] w-[480px] rounded-xl" />
          </div>
        </div>

        {/* Right: Details skeleton */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
          </div>

          <Skeleton className="h-10 w-3/4" />

          <div className="md:flex items-start justify-between md:w-3/4 gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-4 w-[85%]" />
              <Skeleton className="h-4 w-[70%] mt-2" />
              <Skeleton className="h-4 w-[60%] mt-2" />
            </div>
            <div className="hidden lg:block">
              <Skeleton className="h-16 w-16 rounded" />
              <Skeleton className="h-3 w-16 mt-2" />
            </div>
          </div>

          <div className="flex items-end gap-3">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-14" />
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>

          {/* color */}
          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-7 w-7 rounded-full" />
              ))}
            </div>
          </div>

          {/* size */}
          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-4 w-10" />
            </div>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-10 rounded-md" />
              ))}
            </div>
          </div>

          {/* actions */}
          <div className="grid grid-cols-4 gap-2 w-fit mt-2">
            <Skeleton className="h-10 w-44 col-span-3 rounded-md" />
            <Skeleton className="h-10 w-11 col-span-1 rounded-md" />
          </div>

          <Skeleton className="h-4 w-56 mt-2" />
        </div>
      </div>
    </div>
  );
}
