import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Card Skeleton */}
        <SkeletonCard />
        {/* List Skeleton */}
        <SkeletonList />
        {/* Grid Skeleton */}
        <SkeletonGrid />
      </div>
    </div>
  );
};

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 w-1/4 bg-gray-300 animate-pulse rounded"></div>
          <div className="h-3 w-1/3 bg-gray-300 animate-pulse rounded"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 w-full bg-gray-300 animate-pulse rounded"></div>
        <div className="h-4 w-full bg-gray-300 animate-pulse rounded"></div>
        <div className="h-4 w-3/4 bg-gray-300 animate-pulse rounded"></div>
      </div>
    </div>
  );
};

const SkeletonList = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded bg-gray-300 animate-pulse"></div>
          <div className="flex-1 h-4 bg-gray-300 animate-pulse rounded"></div>
        </div>
      ))}
    </div>
  );
};

const SkeletonGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-white rounded-xl p-4 shadow-lg space-y-3">
          <div className="w-full h-48 bg-gray-300 animate-pulse rounded"></div>
          <div className="h-4 w-3/4 bg-gray-300 animate-pulse rounded"></div>
          <div className="h-3 w-1/2 bg-gray-300 animate-pulse rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
