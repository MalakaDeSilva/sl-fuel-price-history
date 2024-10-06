import express from "express";
import dataRoutes from "./routes/dataRoute";

const app = express();
const PORT = process.env.PORT || 3000;

// Use the routes
app.use("/", dataRoutes);

// Export the serverless function
module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
