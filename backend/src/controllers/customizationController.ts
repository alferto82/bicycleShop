// controllers/customizationController.ts
import { Request, Response } from "express";
import * as customizationService from "../services/customizationService";
import { getErrorMessage } from "../utils/errorHandler";

const validateCombination = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const totalPrice = await customizationService.validateCombination(
      req.body.parts
    );
    res.json({ message: "Valid combination", totalPrice });
  } catch (error) {
    res.status(400).json({ message: getErrorMessage(error) });
  }
};

export { validateCombination };
