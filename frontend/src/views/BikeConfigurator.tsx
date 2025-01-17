import React, { useState } from "react";
import { Box, Button, Typography, Alert } from "@mui/material";
import useBikeConfigurator from "../hooks/useBikeConfigurator";
import PartSelector from "../components/PartSelector";

const BikeConfigurator: React.FC = () => {
  const {
    parts,
    categories,
    selectedParts,
    handleSelectChange,
    handleAddToCart,
    error,
  } = useBikeConfigurator();
  const [totalPrice, setTotalPrice] = useState(0);

  const handlePriceChange = (oldPrice: number, newPrice: number) => {
    setTotalPrice((prevPrice) => prevPrice - oldPrice + newPrice);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Bike Configurator
      </Typography>

      {categories.map((type) => (
        <PartSelector
          key={type}
          type={type}
          parts={parts}
          selectedPart={selectedParts[type]}
          handleSelectChange={handleSelectChange(type)}
          onPriceChange={handlePriceChange}
        />
      ))}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      <Typography align="right" variant="h6" sx={{ mt: 2 }}>
        Total Price: ${totalPrice}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </Box>
  );
};

export default BikeConfigurator;
