import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h2 className="logo">
            <img src="/navbar-logo.webp" alt="logo-img" height="30" width="30px" 
            style={{borderRadius:"50%", padding:"2px", border:"2px solid white",marginRight:"10px" }}/>
            MyShop</h2>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/cart" className="cart-link">
            Cart
            {totalQuantity > 0 && (
              <span className="cart-badge">{totalQuantity}</span>
            )}
          </Link>
          <Link to="/checkout">Checkout</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
