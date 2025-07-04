import React from "react";

const ProductCard = ({ imageSrc, price, name }) => {
  return (
    <div className="transform transition hover:translate-y-1 hover:scale-110">
      <img
        alt=""
        src={imageSrc}
        className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
      />
      <h3 className="mt-4 text-md font-semibold text-gray-700">{name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{price}</p>
    </div>
  );
};

export default ProductCard;
