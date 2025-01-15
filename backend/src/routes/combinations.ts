// routes/combinations.ts
import express from "express";
import * as combinationController from "../controllers/combinationController";

const router = express.Router();

router.get("/", combinationController.getAllCombinations);
router.post("/", combinationController.createCombination);
router.put("/:id", combinationController.updateCombination);
router.delete("/:id", combinationController.deleteCombination);

export default router;
