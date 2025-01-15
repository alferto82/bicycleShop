// services/partService.ts
import Part from "../models/Part";

const getAllParts = async (): Promise<Part[]> => {
  return await Part.findAll();
};

const createPart = async (partData: Omit<Part, "id">): Promise<Part> => {
  return await Part.create(partData);
};

const markOutOfStock = async (id: number): Promise<Part> => {
  const part = await Part.findByPk(id);
  if (part) {
    part.inStock = false;
    await part.save();
    return part;
  }
  throw new Error("Part not found");
};

const getPartsByCategoryAndType = async (
  category: string,
  type: string
): Promise<Part[]> => {
  return await Part.findAll({
    where: {
      category,
      type,
    },
  });
};

export { getAllParts, createPart, markOutOfStock, getPartsByCategoryAndType };
