import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import useProducts from "../hooks/useProducts";
import ShimmerList from "./ShimmerList";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Products() {
  useProducts();
  const { products, loading } = useSelector((store) => store.products);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {loading || !Array.isArray(products) ? (
            <ShimmerList />
          ) : (
            products.map((product) => (
              <Link key={product.id} to={"/product/" + product.id}>
                <ProductCard
                  imageSrc={product.image}
                  price={product.price}
                  name={product.name}
                  minQuantity={product.minQuantity}
                  pricePerPiece={product.pricePerPiece}
                  quantity={product.quantity}
                  description={product.description}
                  categories={product?.categories}
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
