import { configureStore } from "@reduxjs/toolkit";
import itemListReducer from "../features/Items/itemSlice";

export const store = configureStore({
  reducer: {
    itemList: itemListReducer,
  },
});
