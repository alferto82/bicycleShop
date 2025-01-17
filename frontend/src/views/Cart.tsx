import { Box, Typography } from "@mui/material";
import React from "react";
import CartItem from "../components/CartItem";
import { useCart } from "../hooks/useCart";

const Cart: React.FC = () => {
  const { cartItems, handleRemoveFromCart } = useCart();

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, bike) => total + bike.totalPrice + bike.priceAdjustment,
      0
    );
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty</Typography>
      ) : (
        <Box>
          {cartItems.map((bike, index) => (
            <CartItem
              key={`bike-${index}`}
              bike={bike}
              index={index}
              onRemove={handleRemoveFromCart}
            />
          ))}
          <Typography variant="h5" align="right" sx={{ mt: 2 }}>
            Total Price: ${calculateTotalPrice()}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
