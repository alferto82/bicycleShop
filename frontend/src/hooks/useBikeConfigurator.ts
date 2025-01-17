import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { validateAndAddToCart } from "../redux/slices/cartSlice";
import { RootState } from "../redux/store";

interface Part {
  id: number;
  name: string;
  category: string;
  type: string;
  price: number;
}

const useBikeConfigurator = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedParts, setSelectedParts] = useState<{ [key: string]: string }>(
    {}
  );
  const error = useSelector((state: RootState) => state.cart.error);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const response = await axios.get("/parts");
        const bicycleParts = response.data.filter(
          (part: Part) => part.category === "Bicycle"
        );
        setParts(bicycleParts);
        setCategories(
          Array.from(new Set(bicycleParts.map((part: Part) => part.type)))
        );
      } catch (error) {
        console.error("Error fetching parts:", error);
      }
    };

    fetchParts();
  }, []);

  const handleSelectChange =
    (category: string) => (event: React.ChangeEvent<{ value: unknown }>) => {
      setSelectedParts({
        ...selectedParts,
        [category]: event.target.value as string,
      });
    };

  const handleAddToCart = () => {
    const selectedPartObjects = Object.entries(selectedParts)
      .map(([type, name]) =>
        parts.find((part) => part.type === type && part.name === name)
      )
      .filter(Boolean) as Part[];

    dispatch(validateAndAddToCart(selectedPartObjects));
  };

  return {
    parts,
    categories,
    selectedParts,
    handleSelectChange,
    handleAddToCart,
    error,
  };
};

export default useBikeConfigurator;
