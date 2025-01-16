// services/combinationService.test.ts
import {
  getAllCombinations,
  createCombination,
  updateCombination,
  deleteCombination,
} from "../services/combinationService";
import Combination from "../models/Combination";

jest.mock("../models/Combination");

describe("Combination Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should return all combinations", async () => {
    const mockCombinations = [{ id: 1, part1: 1, part2: 2, allowed: true }];
    (Combination.findAll as jest.Mock).mockResolvedValue(mockCombinations);

    const combinations = await getAllCombinations();
    expect(combinations).toEqual(mockCombinations);
  });

  it("should create a new combination", async () => {
    const newCombination = {
      part1: 1,
      part2: 2,
      allowed: true,
    };
    const createdCombination = { id: 2, ...newCombination };
    (Combination.create as jest.Mock).mockResolvedValue(createdCombination);

    const combination = await createCombination(
      newCombination as Omit<Combination, "id">
    );
    expect(combination).toEqual(createdCombination);
  });

  it("should update a combination", async () => {
    const mockCombination = {
      id: 1,
      part1: 1,
      part2: 2,
      allowed: true,
      update: jest.fn().mockResolvedValue({
        part1: 4,
        part2: 2,
        allowed: true,
      }),
    };
    (Combination.findByPk as jest.Mock).mockResolvedValue(mockCombination);

    const updatedCombination = await updateCombination(1, {
      part1: 1,
    });
    expect(updatedCombination.part1).toBe(4);
    expect(mockCombination.update).toHaveBeenCalled();
  });

  it("should throw an error if combination not found when updating", async () => {
    (Combination.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(updateCombination(1, { part1: 4 })).rejects.toThrow(
      "Combination not found"
    );
  });

  it("should delete a combination", async () => {
    const mockCombination = {
      id: 1,
      part1: 1,
      part2: 2,
      allowed: true,
      destroy: jest.fn().mockResolvedValue(true),
    };
    (Combination.findByPk as jest.Mock).mockResolvedValue(mockCombination);

    await deleteCombination(1);
    expect(mockCombination.destroy).toHaveBeenCalled();
  });

  it("should throw an error if combination not found when deleting", async () => {
    (Combination.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(deleteCombination(1)).rejects.toThrow("Combination not found");
  });

  it("should throw an error if createCombination fails", async () => {
    const newCombination = {
      part1: 1,
      part2: 2,
      allowed: true,
    };
    (Combination.create as jest.Mock).mockRejectedValue(
      new Error("Creation failed")
    );

    await expect(
      createCombination(newCombination as Omit<Combination, "id">)
    ).rejects.toThrow("Creation failed");
  });

  it("should throw an error if getAllCombinations fails", async () => {
    (Combination.findAll as jest.Mock).mockRejectedValue(
      new Error("Fetch failed")
    );

    await expect(getAllCombinations()).rejects.toThrow("Fetch failed");
  });
});
