import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Layout/Header";
import Footer from "./components/UI/Footer/Footer";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Meals from "./components/Meals/Meals";
import Banner from "./components/UI/Banner/Banner";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  const updateCartQuantityHandler = (quantity) => {
    setCartQuantity(quantity);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} cartQuantity={cartQuantity} />
      <ToastContainer position="top-center" limit={2} autoClose={2000} />
      <main>
        <Meals onAddToCart={updateCartQuantityHandler} />
      </main>
      <Banner />
      <Footer />
    </CartProvider>
  );
}

export default App;
