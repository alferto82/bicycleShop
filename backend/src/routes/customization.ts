// routes/customization.ts
import express from "express";
import * as customizationController from "../controllers/customizationController";

const router = express.Router();

router.post("/validate", customizationController.validateCombination);
router.post("/validate-variations", customizationController.validateVariations);
router.post("/check-combinations", customizationController.checkCombinations);

export default router;
