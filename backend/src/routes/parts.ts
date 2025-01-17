import express from "express";
import * as partController from "../controllers/partController";

const router = express.Router();

router.get("/", partController.getAllParts);
router.post("/", partController.createPart);
router.put("/:id/out-of-stock", partController.markOutOfStock);
router.get("/filter", partController.getPartsByCategoryAndType);
router.delete("/:id", partController.deletePart); // Nuevo endpoint para eliminar una parte

export default router;
