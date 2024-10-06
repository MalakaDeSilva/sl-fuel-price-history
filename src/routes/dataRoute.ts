// src/routes/dataRoutes.ts
import { Router } from "express";
import { getTableData } from "../controllers/dataController";

const router = Router();

// Define the route for data retrieval
router.get("/data", getTableData);

export default router;
