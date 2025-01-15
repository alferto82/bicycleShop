// src/app.ts
import express from "express";
import cors from "cors";
import partRoutes from "./routes/parts";
import combinationRoutes from "./routes/combinations";
import customizationRoutes from "./routes/customization";

const app = express();

// Configurar CORS
app.use(cors());

app.use(express.json());

app.use("/parts", partRoutes);
app.use("/combinations", combinationRoutes);
app.use("/customization", customizationRoutes);

export default app;
