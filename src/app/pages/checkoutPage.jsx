import { useDispatch, useSelector } from "react-redux";
import { checkoutCart, resetStatus } from "../features/cart/cartSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items = [], totalPrice = 0, status } = useSelector(
    (state) => state.cart
  );

  const [open, setOpen] = useState(false);

  const calculatePrice = totalPrice;

  const discountPrice =
    calculatePrice > 500
      ? (calculatePrice - calculatePrice * 0.05).toFixed(2)
      : calculatePrice;

  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success") {
      setOpen(true);

      const timer = setTimeout(() => {
        setOpen(false);
        dispatch(resetStatus());
        navigate("/");
      }, 1500);

      return () => clearTimeout(timer);
    } else if (status === "error") {
      alert("Payment failed. Please try again.");
      setOpen(false);
      dispatch(resetStatus());
    }
  }, [status, dispatch, navigate]);

  const handleClose = () => {
    setOpen(false);
    dispatch(resetStatus());
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Order Summary</h2>

        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.id} style={styles.itemRow}>
                <div style={styles.itemLeft}>
                  <h4>{item.name}</h4>
                  <span style={styles.quantity}>{item.quantity}</span>
                </div>

                <h5>₹{item.price * item.quantity}</h5>
              </div>
            ))}

            <div style={styles.divider}></div>

            <div style={styles.totalRow}>
              <h4>Total</h4>
              <h4>₹{totalPrice}</h4>
            </div>

            <div style={styles.totalRow}>
              <h4>Discounted Price</h4>
              <h4>₹{discountPrice}</h4>
            </div>

            {/* ✅ FIXED BUTTON */}
            <button
              style={styles.button}
              onClick={() => dispatch(checkoutCart())}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Processing..." : "Pay Now"}
            </button>
          </>
        )}
      </div>

      {open && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Payment Successful 🎉</h2>
            <p>Your order has been placed successfully.</p>

            {/* ✅ FIXED BUTTON */}
            <button onClick={handleClose} style={styles.button}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px",
    backgroundColor: "#f5f6fa",
    minHeight: "80vh",
  },
  card: {
    width: "100%",
    maxWidth: "700px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  title: {
    marginBottom: "25px",
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 0",
    borderBottom: "1px solid #eee",
  },
  itemLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  quantity: {
    backgroundColor: "#eef2ff",
    padding: "2px 8px",
    borderRadius: "12px",
    fontWeight: 500,
  },
  divider: {
    marginTop: "20px",
    marginBottom: "10px",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },

  /* ✅ Added button styles */
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
};