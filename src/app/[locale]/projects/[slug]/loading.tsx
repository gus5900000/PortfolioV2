export default function Loading() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Image skeleton */}
        <div className="w-full h-64 mb-6 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse" />
        
        {/* Header skeleton */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/2 animate-pulse" />
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-32 animate-pulse" />
          </div>
          <div className="flex gap-2 mb-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-16 animate-pulse" />
            ))}
          </div>
        </div>
        
        {/* Content skeleton */}
        {[1, 2, 3, 4].map((section) => (
          <div key={section} className="mb-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-2 animate-pulse" />
            <div className="space-y-2">
              {[1, 2, 3].map((line) => (
                <div key={line} className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
