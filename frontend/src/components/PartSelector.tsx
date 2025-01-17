import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

interface Part {
  id: number;
  name: string;
  type: string;
  price: number;
}

interface PartSelectorProps {
  type: string;
  parts: Part[];
  selectedPart: string;
  handleSelectChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  onPriceChange: (oldPrice: number, newPrice: number) => void;
}

const PartSelector: React.FC<PartSelectorProps> = ({
  type,
  parts,
  selectedPart,
  handleSelectChange,
  onPriceChange,
}) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newSelectedPart = parts.find(
      (part) => part.name === event.target.value
    );
    const oldSelectedPart = parts.find((part) => part.name === selectedPart);

    if (newSelectedPart) {
      onPriceChange(oldSelectedPart?.price || 0, newSelectedPart.price);
    }
    handleSelectChange(event);
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{type}</InputLabel>
      <Select value={selectedPart || ""} onChange={handleChange}>
        {parts
          .filter((part) => part.type === type)
          .map((part) => (
            <MenuItem key={part.id} value={part.name}>
              {part.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default PartSelector;
