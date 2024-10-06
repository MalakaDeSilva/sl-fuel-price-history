import express from "express";
import cors from "cors";
import dataRoutes from "./routes/dataRoute";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './config/swaggerConfig';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Swagger setup
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Use the routes
app.use("/", (req, res) => {
  res.status(200).json({status: "UP", "docs": "{host}/docs"})
})
app.use("/api", dataRoutes);

// Export the serverless function
module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
