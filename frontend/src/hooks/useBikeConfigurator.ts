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
  const [totalPrice, setTotalPrice] = useState<number>(0);
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

  const calculateTotalPrice = (selectedParts: { [key: string]: string }) => {
    const selectedPartObjects = Object.entries(selectedParts)
      .map(([type, name]) =>
        parts.find((part) => part.type === type && part.name === name)
      )
      .filter(Boolean) as Part[];

    const totalPrice = selectedPartObjects.reduce(
      (total, part) => total + part.price,
      0
    );

    setTotalPrice(totalPrice);
  };

  const handleSelectChange =
    (category: string) => (event: React.ChangeEvent<{ value: unknown }>) => {
      const newSelectedParts = {
        ...selectedParts,
        [category]: event.target.value as string,
      };
      setSelectedParts(newSelectedParts);
      calculateTotalPrice(newSelectedParts);
    };

  const handleAddToCart = async () => {
    const selectedPartObjects = Object.entries(selectedParts)
      .map(([type, name]) =>
        parts.find((part) => part.type === type && part.name === name)
      )
      .filter(Boolean) as Part[];

    try {
      await dispatch(validateAndAddToCart(selectedPartObjects));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return {
    parts,
    categories,
    selectedParts,
    handleSelectChange,
    handleAddToCart,
    totalPrice,
    error,
  };
};

export default useBikeConfigurator;
