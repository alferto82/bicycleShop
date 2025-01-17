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
    totalPrice,
    priceAdjustment,
    disabledOptions,
    error,
  } = useBikeConfigurator();
  const [temporalPrice, setTemporalPrice] = useState(totalPrice);

  const handlePriceChange = (oldPrice: number, newPrice: number) => {
    setTemporalPrice((prevPrice) => prevPrice - oldPrice + newPrice);
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
          disabledOptions={Object.values(disabledOptions).flat()}
        />
      ))}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      <Typography align="right" variant="body2" sx={{ mt: 1 }}>
        Price: ${temporalPrice}
      </Typography>

      {priceAdjustment > 0 && (
        <Typography
          align="right"
          variant="body2"
          sx={{ mt: 1, color: "green" }}
        >
          Price Adjustment: +${priceAdjustment}
        </Typography>
      )}

      <Typography align="right" variant="h6" sx={{ mt: 2 }}>
        Total Price: ${temporalPrice + priceAdjustment}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </Box>
  );
};

export default BikeConfigurator;
