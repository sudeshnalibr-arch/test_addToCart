// import { useSelector, useDispatch } from "react-redux";
// import {
//   increaseQty,
//   decreaseQty,
//   clearCart
// } from "../features/cart/cartSlice";
// import { Link } from "react-router-dom";

// const CartPage = () => {
//   const { items, totalPrice } = useSelector(state => state.cart);
//   const dispatch = useDispatch();

//   return (
//     <div className="cart">
//       <h2>Your Cart</h2>

//       {items.map(item => (
//         <div key={item.id} className="cart-item">
//           <div className="item-name">
//             <span>{item.name}</span>
//             <div>
//               <span>₹{item.price}</span>
//             </div>
//           </div>
          
//           <div className="item-qty">
//             <div >
//             <button onClick={() => dispatch(decreaseQty(item.id))}>-</button>
//             <span>{item.quantity}</span>
//             <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
//             </div>
//             <div>
//               <span>₹{item.price * item.quantity}</span>
//             </div>
//             <button onClick={() => dispatch(clearCart())}>Remove</button>
//           </div>
          
//         </div>
//       ))}

//       <h3>Total: ₹{totalPrice}</h3>


//       <button onClick={() => dispatch(clearCart())} style={{marginRight:"20px"}}>
//         Clear Cart
//       </button>

//       <Link to="/checkout">
//         <button>Checkout</button>
//       </Link>
//     </div>
//   );
// };

// export default CartPage;


import { useSelector, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  clearCart,
  removeCartItem
} from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { items, totalPrice, } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  

  return (
    <div className="cart-container">
      <div className="cart-card">
        <h2 className="cart-title">Your Cart</h2>

        {items.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <>
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-left">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                </div>

                <div className="item-right">
                  <div className="qty-controls">
                    <button onClick={() => dispatch(decreaseQty(item.id))}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
                  </div>

                  <div className="item-total">
                    ₹{item.price * item.quantity}
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => dispatch(removeCartItem(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Bottom Section */}
            <div className="cart-summary">
              <button
                className="clear-btn"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>

              <div className="total-price">
                Total: ₹{totalPrice}
              </div>
            </div>

            <Link to="/checkout">
              <button className="checkout-btn">
                Proceed to Checkout
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
