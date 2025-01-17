import { Part } from "../redux/slices/cartSlice";

const CART_ITEMS_KEY = "cartItems";

export const loadCartItems = (): Part[][] => {
  const storedItems = localStorage.getItem(CART_ITEMS_KEY);
  return storedItems ? JSON.parse(storedItems) : [];
};

export const saveCartItems = (items: Part[][]): void => {
  localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(items));
};
