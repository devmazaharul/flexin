import { Skeleton } from "@/components/ui/skeleton"

export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl shadow-[#e8eaed] transition-shadow duration-300 border border-gray-200/20 p-4">
      {/* Image skeleton */}
      <Skeleton className="h-40 w-full rounded-lg" />

      {/* Title */}
      <div className="mt-3 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Price & stock */}
      <div className="mt-3 flex items-center justify-between">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-4 w-20" />
      </div>

      {/* Button */}
      <Skeleton className="mt-4 h-10 w-full rounded-md" />
    </div>
  )
}

export function ProductsSkeletonGrid({len}:{len:number}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: len }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  )
}
