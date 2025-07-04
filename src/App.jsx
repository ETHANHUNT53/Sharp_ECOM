import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Products from "./components/Products";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import LoginWithPhone from "./components/LoginWithPhone";
import LoginWithGoogle from "./components/LoginWithGoogle";
import AuthProvider from "./components/AuthProvider";
import Checkout from "./components/Checkout";

function App() {
  return (
    <Provider store={appStore}>
      <AuthProvider>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginWithGoogle />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </AuthProvider>
    </Provider>
  );
}

export default App;
