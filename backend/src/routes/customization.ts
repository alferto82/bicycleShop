// routes/customization.ts
import express from "express";
import * as customizationController from "../controllers/customizationController";

const router = express.Router();

router.post("/validate", customizationController.validateCombination);

export default router;
