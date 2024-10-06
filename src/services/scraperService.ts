// src/services/scraperService.ts
import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";
import { TableData } from "../models/TableData";

const url = "https://ceypetco.gov.lk/historical-prices/";
const jsonFilePath = "tableDataWithHeaders.json";

/**
 * Scrapes the table data from the website and saves it to a JSON file.
 * @returns A promise that resolves to the scraped table data.
 */
export const scrapeTable = async (): Promise<TableData[]> => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const table = $('table[data-id="9fdc03b"]');
    let headers: string[] = [];
    const tableData: TableData[] = [];

    // Extract the headers and rows
    table.find("tr").each((index, element) => {
      const row: string[] = [];
      if (index === 0) {
        // Get headers
        $(element)
          .find("th, td")
          .each((i, cell) => {
            if (i === 0) {
              headers.push("Date");
            } else {
              headers.push($(cell).text().trim());
            }
          });
      } else {
        // Get rows
        $(element)
          .find("td")
          .each((_, cell) => {
            row.push($(cell).text().trim());
          });

        if (row.length) {
          const rowData: TableData = {};
          headers.forEach((header, i) => {
            if (header) rowData[header] = row[i] || "";
            else rowData["Date"] = row[i] || "";
          });
          tableData.push(rowData);
        }
      }
    });

    // Save the data to a JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(tableData, null, 2), "utf-8");
    return tableData;
  } catch (error) {
    throw new Error("Error occurred during scraping");
  }
};

/**
 * Reads the previously saved JSON file.
 * @returns A promise that resolves to the saved table data.
 */
export const getSavedData = (): TableData[] => {
  if (fs.existsSync(jsonFilePath)) {
    const data = fs.readFileSync(jsonFilePath, "utf-8");
    return JSON.parse(data) as TableData[];
  } else {
    throw new Error("No saved data available");
  }
};
