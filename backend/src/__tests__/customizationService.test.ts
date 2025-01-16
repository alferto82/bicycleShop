import { validateCombination } from "../services/customizationService";
import Part from "../models/Part";
import PartVariation from "../models/PartVariation";
import Combination from "../models/Combination";

jest.mock("../models/Part");
jest.mock("../models/PartVariation");
jest.mock("../models/Combination");

describe("Customization Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should return correct total price when no variation applies", async () => {
    const mockPartIds = [1, 2, 3];

    (Part.findAll as jest.Mock).mockResolvedValueOnce([
      { id: 1, price: 10, inStock: true },
      { id: 2, price: 15, inStock: true },
      { id: 3, price: 20, inStock: true },
    ]);

    // Mock de PartVariation.findAll para devolver un array vacío (sin variaciones)
    (PartVariation.findAll as jest.Mock).mockResolvedValueOnce([]);

    (Combination.findAll as jest.Mock).mockResolvedValueOnce([]);

    const totalPrice = await validateCombination(mockPartIds);

    expect(totalPrice).toBe(45); // 10 + 15 + 20
  });

  it("should return correct total price when no variation applies", async () => {
    const mockPartIds = [1, 2, 3];

    (Part.findAll as jest.Mock).mockResolvedValueOnce([
      { id: 1, price: 10, inStock: true },
      { id: 2, price: 15, inStock: true },
      { id: 3, price: 20, inStock: true },
    ]);

    (PartVariation.findAll as jest.Mock).mockResolvedValueOnce([]);
    (Combination.findAll as jest.Mock).mockResolvedValueOnce([]);

    const totalPrice = await validateCombination(mockPartIds);

    expect(totalPrice).toBe(45); // 10 + 15 + 20
  });

  it("should throw an error if a part is out of stock", async () => {
    const mockPartIds = [1, 2];

    (Part.findAll as jest.Mock).mockResolvedValueOnce([
      { id: 1, price: 10, inStock: true },
      { id: 2, price: 15, inStock: false },
    ]);

    await expect(validateCombination(mockPartIds)).rejects.toThrow(
      "2 is out of stock"
    );
  });

  it("should throw an error if a part does not exist", async () => {
    const mockPartIds = [1, 2];

    (Part.findAll as jest.Mock).mockResolvedValueOnce([
      { id: 1, price: 10, inStock: true },
    ]);
    (Combination.findAll as jest.Mock).mockResolvedValueOnce([]);

    await expect(validateCombination(mockPartIds)).rejects.toThrow(
      "Some parts do not exist or are unavailable."
    );
  });

  it("should add price adjustments from applicable variations", async () => {
    const mockPartIds = [1, 2];

    (Part.findAll as jest.Mock).mockResolvedValueOnce([
      { id: 1, price: 10, inStock: true },
      { id: 2, price: 15, inStock: true },
    ]);

    (PartVariation.findAll as jest.Mock).mockResolvedValueOnce([
      { partIds: [1, 2], priceAdjustment: 5 },
    ]);

    (Combination.findAll as jest.Mock).mockResolvedValueOnce([]);

    const totalPrice = await validateCombination(mockPartIds);

    expect(totalPrice).toBe(30); // 10 + 15 + 5
  });

  it("should ignore variations that do not apply to selected parts", async () => {
    const mockPartIds = [1, 2];

    (Part.findAll as jest.Mock).mockResolvedValueOnce([
      { id: 1, price: 10, inStock: true },
      { id: 2, price: 15, inStock: true },
    ]);

    (PartVariation.findAll as jest.Mock).mockResolvedValueOnce([
      { partIds: [1, 3], priceAdjustment: 5 },
    ]);

    (Combination.findAll as jest.Mock).mockResolvedValueOnce([]);

    const totalPrice = await validateCombination(mockPartIds);

    expect(totalPrice).toBe(25); // 10 + 15
  });

  it("should throw an error if a prohibited combination is found", async () => {
    const mockPartIds = [1, 2];

    (Part.findAll as jest.Mock).mockResolvedValueOnce([
      { id: 1, price: 10, inStock: true },
      { id: 2, price: 15, inStock: true },
    ]);

    (Combination.findAll as jest.Mock).mockResolvedValueOnce([
      {
        part1: 1,
        part2: 2,
        allowed: false,
      },
    ]);

    await expect(validateCombination(mockPartIds)).rejects.toThrow(
      "The following combinations are not allowed: 1 and 2"
    );
  });

  it("should return total price even if no variations are found", async () => {
    const mockPartIds = [1, 2];

    (Part.findAll as jest.Mock).mockResolvedValueOnce([
      { id: 1, price: 10, inStock: true },
      { id: 2, price: 15, inStock: true },
    ]);

    (PartVariation.findAll as jest.Mock).mockResolvedValueOnce([]);
    (Combination.findAll as jest.Mock).mockResolvedValueOnce([]);

    const totalPrice = await validateCombination(mockPartIds);

    expect(totalPrice).toBe(25); // 10 + 15
  });
});
