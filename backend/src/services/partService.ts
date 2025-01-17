import Part from "../models/Part";

const getAllParts = async (page?: number, limit?: number): Promise<Part[]> => {
  const options = {
    ...(page && limit
      ? {
          offset: (page - 1) * limit,
          limit,
        }
      : {}),
  };

  return await Part.findAll(options);
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

const deletePart = async (id: number): Promise<void> => {
  const part = await Part.findByPk(id);
  if (part) {
    await part.destroy();
  } else {
    throw new Error("Part not found");
  }
};

export {
  getAllParts,
  createPart,
  markOutOfStock,
  getPartsByCategoryAndType,
  deletePart,
};
