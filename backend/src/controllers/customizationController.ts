// controllers/customizationController.ts
import { Request, Response } from "express";
import * as customizationService from "../services/customizationService";
import { getErrorMessage } from "../utils/errorHandler";

const validateCombination = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { totalPrice, errorMessage } =
      await customizationService.validateCombination(req.body.parts);
    if (errorMessage) {
      res.status(400).json({ isValid: false, errorMessage });
    } else {
      res.json({ totalPrice, isValid: true });
    }
  } catch (error) {
    res
      .status(400)
      .json({ isValid: false, errorMessage: getErrorMessage(error) });
  }
};

export { validateCombination };
