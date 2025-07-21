import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";

import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import ShimmerList from "./ShimmerList";
import ProductMachines from "./ProductMachines";
import ProductRaw from "./ProductRaw";
import { useEffect } from "react";

export default function Home() {
  useProducts();
  const { products, loading } = useSelector((store) => store.products);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="bg-gray-100 py-12 pt-[30%] md:pt-[15%] lg:pt-[10%]">
      <p className="w-[60%] md:text-xl text-justify font-semibold text-gray-900 mx-auto mb-8">
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
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32 ">
          <h3 className="text-4xl font-semibold mb-[2%] ">Machines</h3>
          <ProductMachines />
          <h3 className="text-4xl font-semibold my-[2%] ">
            Raw Materials / Scrubbers
          </h3>
          <ProductRaw />
        </div>
      </div>
    </div>
  );
}
