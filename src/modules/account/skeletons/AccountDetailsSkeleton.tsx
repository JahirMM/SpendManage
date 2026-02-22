import { Skeleton } from "@/components/ui/skeleton";

function AccountDetailsSkeleton() {
  return (
    <div className="max-w-5xl px-4 py-3 mx-auto md:max-w-7xl xl:px-0">
      {/* AccountHeader skeleton */}
      <header>
        <Skeleton className="w-20 h-5 mb-5 bg-gray-200" />
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:gap-0">
          <div className="space-y-4">
            <div className="flex justify-between">
              <Skeleton className="w-48 h-8 lg:w-64 bg-gray-200" />
              <div className="flex gap-3 md:hidden">
                <Skeleton className="size-7 rounded-md bg-gray-200" />
                <Skeleton className="size-7 rounded-md bg-gray-200" />
              </div>
            </div>
            <Skeleton className="w-40 h-4 bg-gray-200" />
            <div className="flex gap-3">
              <Skeleton className="w-16 h-6 rounded-2xl bg-gray-200" />
              <Skeleton className="w-24 h-4 bg-gray-200" />
            </div>
          </div>
          <div className="hidden gap-3 md:flex md:items-center">
            <Skeleton className="size-7 rounded-md bg-gray-200" />
            <Skeleton className="size-7 rounded-md bg-gray-200" />
          </div>
        </div>
      </header>

      {/* AccountStats + AccountChart skeleton */}
      <div className="grid grid-cols-1 gap-3 mt-5 md:grid-cols-2">
        {/* AccountStats */}
        <div className="space-y-3">
          <Skeleton className="w-full h-28 rounded-xl bg-gray-200" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Skeleton className="w-full h-24 rounded-xl bg-gray-200" />
            <Skeleton className="w-full h-24 rounded-xl bg-gray-200" />
            <Skeleton className="w-full h-24 rounded-xl bg-gray-200" />
          </div>
        </div>
        {/* AccountChart */}
        <Skeleton className="w-full h-96 rounded-xl bg-gray-200" />
      </div>

      {/* StatementDownload skeleton */}
      <div className="mt-5">
        <Skeleton className="w-full h-28 rounded-xl bg-gray-200" />
      </div>

      {/* MovementsList skeleton */}
      <div className="mt-5">
        <Skeleton className="w-full h-64 rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}

export default AccountDetailsSkeleton;
