import {
  getAllParts,
  createPart,
  markOutOfStock,
  getPartsByCategoryAndType,
} from "../services/partService";
import Part from "../models/Part";

jest.mock("../models/Part");

describe("Part Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should return all parts", async () => {
    const mockParts = [{ id: 1, name: "Brake Pad" }];
    (Part.findAll as jest.Mock).mockResolvedValue(mockParts);

    const parts = await getAllParts();
    expect(parts).toEqual(mockParts);
  });

  it("should create a new part", async () => {
    const newPart: Partial<Part> = {
      name: "Chain",
      category: "Drivetrain",
      type: "Component",
      inStock: true,
    };
    const createdPart = { id: 2, ...newPart };
    (Part.create as jest.Mock).mockResolvedValue(createdPart);

    const part = await createPart(newPart as Omit<Part, "id">);
    expect(part).toEqual(createdPart);
  });

  it("should mark a part as out of stock", async () => {
    const mockPart = {
      id: 1,
      name: "Brake Pad",
      inStock: true,
      save: jest.fn().mockResolvedValue(true),
    };
    (Part.findByPk as jest.Mock).mockResolvedValue(mockPart);

    const part = await markOutOfStock(1);
    expect(part.inStock).toBe(false);
    expect(mockPart.save).toHaveBeenCalled();
  });

  it("should throw an error if part not found when marking out of stock", async () => {
    (Part.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(markOutOfStock(1)).rejects.toThrow("Part not found");
  });

  it("should return parts by category and type", async () => {
    const mockParts = [
      { id: 1, name: "Brake Pad", category: "Brakes", type: "Component" },
    ];
    (Part.findAll as jest.Mock).mockResolvedValue(mockParts);

    const parts = await getPartsByCategoryAndType("Brakes", "Component");
    expect(parts).toEqual(mockParts);
  });

  it("should return an empty array if no parts match the category and type", async () => {
    (Part.findAll as jest.Mock).mockResolvedValue([]);

    const parts = await getPartsByCategoryAndType(
      "NonExistentCategory",
      "NonExistentType"
    );
    expect(parts).toEqual([]);
  });

  it("should throw an error if createPart fails", async () => {
    const newPart: Partial<Part> = {
      name: "Chain",
      category: "Drivetrain",
      type: "Component",
      inStock: true,
    };
    (Part.create as jest.Mock).mockRejectedValue(new Error("Creation failed"));

    await expect(createPart(newPart as Omit<Part, "id">)).rejects.toThrow(
      "Creation failed"
    );
  });

  it("should throw an error if getAllParts fails", async () => {
    (Part.findAll as jest.Mock).mockRejectedValue(new Error("Fetch failed"));

    await expect(getAllParts()).rejects.toThrow("Fetch failed");
  });

  it("should throw an error if getPartsByCategoryAndType fails", async () => {
    (Part.findAll as jest.Mock).mockRejectedValue(new Error("Fetch failed"));

    await expect(
      getPartsByCategoryAndType("Brakes", "Component")
    ).rejects.toThrow("Fetch failed");
  });
});
