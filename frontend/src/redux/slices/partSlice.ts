import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { AppDispatch } from "../store";

interface Part {
  id: number;
  name: string;
  type: string;
  category: string;
  price: number;
  inStock: boolean;
}

interface PartState {
  parts: Part[];
  loading: boolean;
  error: string | null;
}

const initialState: PartState = {
  parts: [],
  loading: false,
  error: null,
};

const partSlice = createSlice({
  name: "parts",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setParts: (state, action: PayloadAction<Part[]>) => {
      state.parts = action.payload;
    },
    addPart: (state, action: PayloadAction<Part>) => {
      state.parts.push(action.payload);
    },
    updatePart: (state, action: PayloadAction<Part>) => {
      const index = state.parts.findIndex(
        (part) => part.id === action.payload.id
      );
      if (index !== -1) {
        state.parts[index] = action.payload;
      }
    },
    removePart: (state, action: PayloadAction<number>) => {
      state.parts = state.parts.filter((part) => part.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setError,
  setParts,
  addPart,
  updatePart,
  removePart,
} = partSlice.actions;

export const fetchParts = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get("/parts");
    dispatch(setParts(response.data));
  } catch (error) {
    dispatch(setError(error.message || "Failed to fetch parts"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createPart =
  (partData: Omit<Part, "id">) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post("/parts", partData);
      dispatch(addPart(response.data));
    } catch (error) {
      dispatch(setError(error.message || "Failed to create part"));
    }
  };

export const toggleStock = (id: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`/parts/${id}/out-of-stock`);
    dispatch(updatePart(response.data));
  } catch (error) {
    dispatch(setError(error.message || "Failed to toggle stock"));
  }
};

export const removePartAsync =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      await axios.delete(`/parts/${id}`);
      dispatch(removePart(id));
    } catch (error) {
      dispatch(setError(error.message || "Failed to remove part"));
    }
  };

export default partSlice.reducer;
