import ProductCard from "./ProductCard";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../utils/productSlice";
import useProducts from "../hooks/useProducts";
import Shimmer from "./Shimmer";

import { Link } from "react-router-dom";

export default function Products() {
  useProducts();
  const { products, loading } = useSelector((store) => store.products);
  // if (!Array.isArray(products)) return null;
  if (loading || !Array.isArray(products)) return <Shimmer />;
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link key={product.id} to={"/product/" + product.id}>
              <ProductCard
                imageSrc={product.image}
                price={product.price}
                name={product.name}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
