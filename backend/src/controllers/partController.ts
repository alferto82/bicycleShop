import { Request, Response } from "express";
import * as partService from "../services/partService";
import { getErrorMessage } from "../utils/errorHandler";

const getAllParts = async (req: Request, res: Response): Promise<void> => {
  const parts = await partService.getAllParts();
  res.json(parts);
};

const createPart = async (req: Request, res: Response): Promise<void> => {
  const part = await partService.createPart(req.body);
  res.json(part);
};

const markOutOfStock = async (req: Request, res: Response): Promise<void> => {
  try {
    const part = await partService.markOutOfStock(parseInt(req.params.id));
    res.json(part);
  } catch (error) {
    res.status(404).json({ message: getErrorMessage(error) });
  }
};

const getPartsByCategoryAndType = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { category, type } = req.query;
    const parts = await partService.getPartsByCategoryAndType(
      category as string,
      type as string
    );
    res.json(parts);
  } catch (error) {
    res.status(400).json({ message: getErrorMessage(error) });
  }
};

export { getAllParts, createPart, markOutOfStock, getPartsByCategoryAndType };
