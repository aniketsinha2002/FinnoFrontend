import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    deleteItem: (state, action) => {
      const indexToDelete = action.payload;
      return state.filter((_, index) => index !== indexToDelete);
    },
    updateItem: (state, action) => {
      const { id, quantity, price, cuttingType, PieceSize } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        existingItem.cuttingType = cuttingType;
        existingItem.PieceSize = PieceSize;
        existingItem.quantity = quantity;
        existingItem.price = price;
      }
    },
  },
});

export const { addItem, deleteItem, updateItem } = cartSlice.actions;
export default cartSlice.reducer;
