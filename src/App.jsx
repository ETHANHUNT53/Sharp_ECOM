import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Products from "./components/Products";
import { Provider } from "react-redux";
import appStore, { persistor } from "./utils/appStore";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import LoginWithGoogle from "./components/LoginWithGoogle";
import AuthProvider from "./components/AuthProvider";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import Profile from "./components/Profile";
import PublicRoute from "./utils/PublicRoute.jsx";
import { PersistGate } from "redux-persist/integration/react";
import ShippingPolicy from "./components/ShippingPolicy.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import TermsAndConditionsPolicy from "./components/TermsAndConditionsPolicy.jsx";
import ProductMachines from "./components/ProductMachines.jsx";
import ProductRaw from "./components/ProductRaw.jsx";

function App() {
  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <div>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product-machines" element={<ProductMachines />} />
              <Route path="/product-raw" element={<ProductRaw />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/returnpolicy" element={<ShippingPolicy />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route
                path="/termsandconditions"
                element={<TermsAndConditionsPolicy />}
              />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <LoginWithGoogle />
                  </PublicRoute>
                }
              />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
