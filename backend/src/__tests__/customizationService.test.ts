import { validateCombination } from "../services/customizationService";
import Part from "../models/Part";
import PartVariation from "../models/PartVariation";
import Combination from "../models/Combination";

jest.mock("../models/Part");
jest.mock("../models/PartVariation");
jest.mock("../models/Combination");

describe("validateCombination", () => {
  it("should calculate the total price correctly", async () => {
    const mockPartIds = [1, 2, 3];

    (Part.findAll as jest.Mock).mockResolvedValueOnce([
      { id: 1, price: 10, inStock: true },
      { id: 2, price: 15, inStock: true },
      { id: 3, price: 20, inStock: true },
    ]);
    (PartVariation.findAll as jest.Mock).mockResolvedValueOnce([]);
    (Combination.findAll as jest.Mock).mockResolvedValueOnce([]);

    const result = await validateCombination(mockPartIds);

    expect(result).toEqual({ totalPrice: 45 }); // 10 + 15 + 20
  });

  it("should return an error if a part is out of stock", async () => {
    const mockPartIds = [1, 2];

    (Part.findAll as jest.Mock).mockResolvedValueOnce([
      { id: 1, price: 10, inStock: true },
      { id: 2, price: 15, inStock: false },
    ]);

    const result = await validateCombination(mockPartIds);

    expect(result).toEqual({
      totalPrice: 0,
      errorMessage: "2 is out of stock",
    });
  });

  it("should return an error if a part does not exist", async () => {
    const mockPartIds = [1, 2];

    (Part.findAll as jest.Mock).mockResolvedValueOnce([
      { id: 1, price: 10, inStock: true },
    ]);
    (Combination.findAll as jest.Mock).mockResolvedValueOnce([]);

    const result = await validateCombination(mockPartIds);

    expect(result).toEqual({
      totalPrice: 0,
      errorMessage: "Some parts do not exist or are unavailable.",
    });
  });

  it("should apply price adjustments based on part variations", async () => {
    const mockPartIds = [1, 2];

    (Part.findAll as jest.Mock).mockResolvedValueOnce([
      { id: 1, price: 10, inStock: true },
      { id: 2, price: 15, inStock: true },
    ]);
    (PartVariation.findAll as jest.Mock).mockResolvedValueOnce([
      { partIds: [1, 2], priceAdjustment: 5 },
    ]);
    (Combination.findAll as jest.Mock).mockResolvedValueOnce([]);

    const result = await validateCombination(mockPartIds);

    expect(result).toEqual({
      totalPrice: 30,
    }); // 10 + 15 + 5
  });

  it("should not apply price adjustments if part variation does not match all selected parts", async () => {
    const mockPartIds = [1, 2, 3];

    (Part.findAll as jest.Mock).mockResolvedValueOnce([
      { id: 1, price: 10, inStock: true },
      { id: 2, price: 15, inStock: true },
      { id: 3, price: 20, inStock: true },
    ]);
    (PartVariation.findAll as jest.Mock).mockResolvedValueOnce([
      { partIds: [1, 2], priceAdjustment: 5 },
    ]);
    (Combination.findAll as jest.Mock).mockResolvedValueOnce([]);

    const result = await validateCombination(mockPartIds);

    expect(result).toEqual({ totalPrice: 45 }); // 10 + 15 + 20 (no adjustment)
  });
});
