import { Request, Response } from "express";
import * as combinationService from "../services/combinationService";
import { getErrorMessage } from "../utils/errorHandler";

const getAllCombinations = async (
  req: Request,
  res: Response
): Promise<void> => {
  const combinations = await combinationService.getAllCombinations();
  res.json(combinations);
};

const createCombination = async (
  req: Request,
  res: Response
): Promise<void> => {
  const combination = await combinationService.createCombination(req.body);
  res.json(combination);
};

const updateCombination = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const combination = await combinationService.updateCombination(
      parseInt(req.params.id),
      req.body
    );
    res.json(combination);
  } catch (error) {
    res.status(404).json({ message: getErrorMessage(error) });
  }
};

const deleteCombination = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await combinationService.deleteCombination(parseInt(req.params.id));
    res.json({ message: "Combination deleted" });
  } catch (error) {
    res.status(404).json({ message: getErrorMessage(error) });
  }
};

export {
  getAllCombinations,
  createCombination,
  updateCombination,
  deleteCombination,
};
