import React from "react";

const ShimmerList = () => {
  const shimmerCards = new Array(16).fill(null); // Adjust number as needed

  return (
    <>
      {shimmerCards.map((_, index) => (
        <div
          key={index}
          className="animate-pulse transform transition hover:translate-y-1 hover:scale-110"
        >
          {/* Image Placeholder */}
          <div className="aspect-square w-full rounded-lg bg-gray-200" />

          {/* Title Placeholder */}
          <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />

          {/* Price Placeholder */}
          <div className="mt-2 h-4 w-1/3 rounded bg-gray-200" />
        </div>
      ))}
    </>
  );
};

export default ShimmerList;
