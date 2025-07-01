import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, setLoading } from "../utils/productSlice";

const useProducts = () => {
  const dispatch = useDispatch();
  //   const products = useSelector((store) => store.products);
  const fetchProducts = async () => {
    dispatch(setLoading());
    try {
      const res = await fetch(
        "https://ethanhunt53.github.io/product-data/products.json"
      );
      const json = await res.json();
      dispatch(addProducts(json)); // ✅ This JSON is a valid array
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
};

export default useProducts;
