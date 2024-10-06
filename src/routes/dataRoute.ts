// src/routes/dataRoutes.ts
import { Router } from "express";
import { getTableData } from "../controllers/dataController";

const router = Router();

/**
 * @swagger
 * /api/data:
 *   get:
 *     summary: Retrieve historical fuel price data
 *     description: Returns a list of fuel prices from the Ceypetco website.
 *     responses:
 *       200:
 *         description: A list of historical fuel prices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Date:
 *                     type: string
 *                     description: The date of the fuel price.
 *                     example: "2023-10-01"
 *                   Petrol:
 *                     type: string
 *                     description: Petrol price.
 *                     example: "370.00"
 *                   Diesel:
 *                     type: string
 *                     description: Diesel price.
 *                     example: "400.00"
 */
router.get("/data", getTableData);

export default router;
