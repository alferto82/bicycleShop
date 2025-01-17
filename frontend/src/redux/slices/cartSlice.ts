import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadCartItems, saveCartItems } from "../../utils/localStorageUtils";
import axiosInstance from "../../api/axios";

export interface Part {
  id: number;
  name: string;
  type: string;
  category: string;
  price: number;
}

export interface Bike {
  parts: Part[];
  totalPrice: number;
}

interface CartState {
  items: Bike[];
  error: string | null;
}

const initialState: CartState = {
  items: loadCartItems(),
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Bike>) => {
      state.items.push(action.payload);
      saveCartItems(state.items);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item, pos) => pos !== action.payload);
      saveCartItems(state.items);
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, setError } = cartSlice.actions;

export const validateAndAddToCart =
  (selectedParts: Part[]) => async (dispatch: any) => {
    try {
      const response = await axiosInstance.post("/customization/validate", {
        parts: selectedParts.map((part) => part.id),
      });
      const { totalPrice, isValid, errorMessage } = response.data;
      if (isValid) {
        const newBike: Bike = {
          parts: selectedParts,
          totalPrice,
        };
        dispatch(addToCart(newBike));
        dispatch(setError(null));
      } else {
        dispatch(setError(errorMessage || "Invalid bike configuration"));
      }
    } catch (error) {
      console.error("Error validating combination:", error);
      dispatch(setError("Error validating combination"));
    }
  };

export default cartSlice.reducer;
