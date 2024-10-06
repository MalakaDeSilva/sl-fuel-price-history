// src/config/swaggerConfig.ts
import { Options } from "swagger-jsdoc";

// Swagger configuration options
const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SL Fuel Price History API",
      version: "1.0.0",
      description: "API documentation for the SL Fuel Price History service",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
      {
        url: "https://sl-fuel-price-history.vercel.app",
        description: "Production server",
      },
    ],
  },
  apis: ["src/routes/*.ts", "src/models/*.ts"], // Paths to the API files
};

export default swaggerOptions;
