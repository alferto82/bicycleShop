import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { RootState } from "../redux/store";

interface Part {
  id: number;
  name: string;
  category: string;
  type: string;
  price: number;
  inStock: boolean;
}

interface Bike {
  parts: Part[];
  totalPrice: number;
  priceAdjustment: number;
}

const useBikeConfigurator = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedParts, setSelectedParts] = useState<{ [key: string]: string }>(
    {}
  );
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [priceAdjustment, setPriceAdjustment] = useState<number>(0);
  const [disabledOptions, setDisabledOptions] = useState<{
    [key: string]: number[];
  }>({});
  const [outOfStockParts, setOutOfStockParts] = useState<number[]>([]);
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

  const checkVariation = async (partIds: number[]) => {
    try {
      const response = await axios.post("/customization/validate-variations", {
        partIds,
      });
      setPriceAdjustment(response.data.priceAdjustment);
    } catch (error) {
      console.error("Error checking variations:", error);
    }
  };

  const checkCombinations = async (partId: number) => {
    try {
      const response = await axios.post("/customization/check-combinations", {
        partId,
      });
      return response.data.disabledOptions;
    } catch (error) {
      console.error("Error checking combinations:", error);
      return [];
    }
  };

  const checkStock = (selectedParts: { [key: string]: string }) => {
    const selectedPartObjects = Object.entries(selectedParts)
      .map(([type, name]) =>
        parts.find((part) => part.type === type && part.name === name)
      )
      .filter(Boolean) as Part[];

    const outOfStockParts = selectedPartObjects
      .filter((part) => !part.inStock)
      .map((part) => part.id);

    setOutOfStockParts(outOfStockParts);
  };

  const handleSelectChange =
    (category: string) =>
    async (event: React.ChangeEvent<{ value: unknown }>) => {
      const newSelectedParts = {
        ...selectedParts,
        [category]: event.target.value as string,
      };
      setSelectedParts(newSelectedParts);
      calculateTotalPrice(newSelectedParts);
      checkStock(newSelectedParts);

      const selectedPartIds = Object.entries(newSelectedParts)
        .map(
          ([type, name]) =>
            parts.find((part) => part.type === type && part.name === name)?.id
        )
        .filter(Boolean) as number[];

      await checkVariation(selectedPartIds);

      // Eliminar restricciones anteriores para la categoría actual
      const updatedDisabledOptions = { ...disabledOptions };
      delete updatedDisabledOptions[category];

      // Agregar nuevas restricciones
      const newDisabledOptions = await checkCombinations(
        parts.find((part) => part.name === event.target.value)?.id!
      );

      setDisabledOptions((prev) => ({
        ...updatedDisabledOptions,
        [category]: newDisabledOptions,
      }));
    };

  const handleAddToCart = () => {
    const selectedPartObjects = Object.entries(selectedParts)
      .map(([type, name]) =>
        parts.find((part) => part.type === type && part.name === name)
      )
      .filter(Boolean) as Part[];

    const newBike: Bike = {
      parts: selectedPartObjects,
      totalPrice: totalPrice + priceAdjustment,
      priceAdjustment,
    };

    dispatch(addToCart(newBike));
  };

  return {
    parts,
    categories,
    selectedParts,
    handleSelectChange,
    handleAddToCart,
    totalPrice,
    priceAdjustment,
    disabledOptions,
    outOfStockParts,
    error,
  };
};

export default useBikeConfigurator;
