import React from "react";

const ProductCard = ({
  imageSrc,
  price,
  name,
  pricePerPiece,
  categories,
  quantity,
  minQuantity,
  description,
}) => {
  return (
    <div className="transform transition  hover:translate-y-1 hover:scale-110">
      <img
        alt=""
        src={imageSrc}
        className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
      />
      <div className=" mx-auto h-2 border-gray-300 border-b-2"></div>
      <h3 className="mt-4 text-md font-semibold text-gray-700">{name}</h3>
      <p className="mt-1 text-xl font-bold text-gray-900">
        ₹ {categories ? pricePerPiece[0] : pricePerPiece} onwards
      </p>
    </div>
  );
};

export default ProductCard;
