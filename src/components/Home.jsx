import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";

import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import ShimmerList from "./ShimmerList";

const callouts = [
  {
    name: "Desk and Office",
    description: "Work from home accessories",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-01.jpg",
    imageAlt:
      "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
    href: "#",
  },
  {
    name: "Self-Improvement",
    description: "Journals and note-taking",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-02.jpg",
    imageAlt:
      "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    href: "#",
  },
  {
    name: "Travel",
    description: "Daily commute essentials",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-03.jpg",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "#",
  },
];

export default function Home() {
  useProducts();
  const { products, loading } = useSelector((store) => store.products);
  console.log(products);
  return (
    <div className="bg-gray-100 py-12">
      <p className="w-[60%] text-xl text-justify font-semibold text-gray-900 mx-auto">
        At Sharp Industries, we take pride in being a trusted Manufacturer and
        Trader of high-quality machinery and products like Ball Pen Making
        Machines, Scrubber Packing Machines, and Dish Scrubbers. Since our
        establishment in 2019, we've been committed to delivering excellence
        through premium-grade materials sourced from authentic vendors. Our
        products are known for their durability, efficiency, and affordability.
        With a focus on timely delivery and customer satisfaction, we are here
        to meet your manufacturing and trading needs.
      </p>
      <div className="mx-auto max-w-7xl -mt-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900 mb-[3%]">Products</h2>

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
    </div>
  );
}
