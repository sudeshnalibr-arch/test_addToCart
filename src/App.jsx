import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./app/pages/homePage";
import CartPage from "./app/pages/cartPage";
import Checkout from "./app/pages/checkoutPage";
import Navbar from "./app/components/navbar";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
