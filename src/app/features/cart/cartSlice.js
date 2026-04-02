import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const checkoutCart = createAsyncThunk(
  "cart/checkoutCart",
  async (_, thunkAPI) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Order placed successfully!");
      }, 2000);
    });
  }
);

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  status: "idle",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);

      if (existing) {
        existing.quantity++;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      state.totalQuantity++;
      state.totalPrice += item.price;
    },

    increaseQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      item.quantity++;
      state.totalQuantity++;
      state.totalPrice += item.price;
    },

    decreaseQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item.quantity > 1) {
        item.quantity--;
        state.totalQuantity--;
        state.totalPrice -= item.price;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    removeCartItem: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find(i => i.id === itemId);
      if (item) {
        state.items = state.items.filter(i => i.id !== itemId);
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
      }
    },
    
    resetStatus: (state) => {
    state.status = "idle";
  },

  },
  extraReducers: (builder) => {
    builder
      .addCase(checkoutCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkoutCart.fulfilled, (state) => {
        state.status = "success";
        state.items = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
      })
      .addCase(checkoutCart.rejected, (state) => {
      state.status = "failed";
    });
  }
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  clearCart,
  resetStatus,
  removeCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;
