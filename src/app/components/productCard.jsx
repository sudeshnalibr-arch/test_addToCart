import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeCartItem } from "../features/cart/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const {items} = useSelector(state => state.cart);
  const inCart = items.some(i => i.id === product.id);

  const handleClickCart = () => {
    if (!inCart) {
      dispatch(addToCart(product));
    }else {
      dispatch(removeCartItem(product.id));
    }
  }
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button onClick={handleClickCart}
      
      style={{
        backgroundColor: inCart ? "#f87171" : "#076ce7",
        color: "#fff",
        border: "none",
        padding: "8px 16px",
        borderRadius: "6px",
        cursor: "pointer",
      }}>
        {inCart ? "Remove from Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
