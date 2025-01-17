import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeFromCart } from "../redux/slices/cartSlice";

export const useCart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (index: number) => {
    dispatch(removeFromCart(index));
  };

  return {
    cartItems,
    handleRemoveFromCart,
  };
};
