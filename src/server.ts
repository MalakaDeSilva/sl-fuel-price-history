import express from "express";
import dataRoutes from "./routes/dataRoute";

const app = express();
const PORT = 3000;

// Use the routes
app.use("/", dataRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
