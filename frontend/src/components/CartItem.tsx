import { Box, Button, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { Part } from "../redux/slices/cartSlice";

interface CartItemProps {
  bike: {
    parts: Part[];
    totalPrice: number;
  };
  index: number;
  onRemove: (index: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ bike, index, onRemove }) => {
  const showParts = (parts: Part[]) => {
    return parts.map((part) => (
      <Box key={part.id} display="flex" justifyContent="space-between">
        <Typography variant="body2">{`${part.type} - ${part.name}`}</Typography>
        <Typography variant="body2" pl={3}>{`$${part.price}`}</Typography>
      </Box>
    ));
  };

  return (
    <Box
      mb={2}
      p={2}
      border={1}
      borderColor="grey.300"
      borderRadius={4}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      {showParts(bike.parts)}
      <Typography
        variant="body2"
        align="left"
        sx={{ mt: 1, fontWeight: "bold" }}
      >
        Price: ${bike.totalPrice}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => onRemove(index)}
        sx={{ mt: 1 }}
      >
        Remove
      </Button>
    </Box>
  );
};

export default React.memo(CartItem);
