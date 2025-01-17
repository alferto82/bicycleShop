import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import partReducer from "./slices/partSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    parts: partReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
