// services/combinationService.ts
import Combination from "../models/Combination";

const getAllCombinations = async (): Promise<Combination[]> => {
  return await Combination.findAll();
};

const createCombination = async (
  combinationData: Omit<Combination, "id">
): Promise<Combination> => {
  return await Combination.create(combinationData);
};

const updateCombination = async (
  id: number,
  combinationData: Partial<Combination>
): Promise<Combination> => {
  const combination = await Combination.findByPk(id);
  if (combination) {
    const updatedCombination: Combination = await combination.update(
      combinationData
    );
    return updatedCombination;
  }
  throw new Error("Combination not found");
};

const deleteCombination = async (id: number): Promise<void> => {
  const combination = await Combination.findByPk(id);
  if (combination) {
    await combination.destroy();
    return;
  }
  throw new Error("Combination not found");
};

export {
  getAllCombinations,
  createCombination,
  updateCombination,
  deleteCombination,
};
