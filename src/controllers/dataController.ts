// src/controllers/dataController.ts
import { Request, Response } from "express";
import { scrapeTable, getSavedData } from "../services/scraperService";

/**
 * Handles the GET request for retrieving table data.
 * Attempts to scrape the data, and falls back to saved data if an error occurs.
 */
export const getTableData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const scrapedData = await scrapeTable();
    res.json(scrapedData);
  } catch (error) {
    try {
      const savedData = getSavedData();
      res.json(savedData);
    } catch (fileError) {
      res.status(500).json({ error: "Failed to retrieve data" });
    }
  }
};
