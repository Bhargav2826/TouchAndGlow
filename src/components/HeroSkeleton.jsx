import React from 'react'

const HeroSkeleton = () => {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Background Shimmer */}
      <div className="absolute inset-0 bg-neutral-900 animate-pulse opacity-50" />
      
      {/* Content Skeleton */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-16">
          <div className="max-w-3xl w-full">
            {/* Label Shimmer */}
            <div className="h-4 w-32 bg-neutral-800 rounded-full mb-8 animate-pulse mx-auto lg:mx-0" />
            
            {/* H1 Shimmer */}
            <div className="h-16 sm:h-24 md:h-32 w-3/4 bg-neutral-800 rounded-2xl mb-8 animate-pulse mx-auto lg:mx-0" />
            <div className="h-16 sm:h-24 md:h-32 w-1/2 bg-neutral-800 rounded-2xl mb-8 animate-pulse mx-auto lg:mx-0" />
            
            {/* Paragraph Shimmer */}
            <div className="h-4 w-full bg-neutral-800 rounded-full mb-4 animate-pulse mx-auto lg:mx-0" />
            <div className="h-4 w-5/6 bg-neutral-800 rounded-full mb-12 animate-pulse mx-auto lg:mx-0" />
            
            {/* Buttons Shimmer */}
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <div className="h-14 w-48 bg-neutral-800 rounded-full animate-pulse" />
              <div className="h-14 w-48 bg-neutral-800 rounded-full animate-pulse opacity-50" />
            </div>
          </div>
        </div>

        {/* Stats Shimmer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-24 mb-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-neutral-800/50 rounded-3xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroSkeleton
