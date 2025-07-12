import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id == item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart: (state, action) => {
      state.items.length = 0;
    },
    updateTotalPrice: (state) => {
      state.totalPrice = state.items.reduce((sum, item) => {
        const unitPrice = item.categories
          ? item.pricePerPiece[0] * item.minQuantity
          : item.price || 0;
        const quantityToCharge = Math.max(item.quantity, item.minQuantity);
        return total + unitPrice * quantityToCharge;
      }, 0);
    },
  },
});

export const {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  updateTotalPrice,
} = cartSlice.actions;
export default cartSlice.reducer;
