const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
// const path = require('path');
const connectDB = require("./src/config/db");

// Set the port from .env or default to 3000
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Enable CORS with specific origin
app.use(
  cors({
    origin: "http://localhost:3000", // Change this to your frontend URL
    credentials: true, // Include credentials if you're using them
  })
);

// Connect to the database
connectDB();

// Serve static files from the uploads directory
app.use("/uploads", express.static(__dirname + "/uploads"));

// Route Handlers
app.use("/api/profile", require("./src/routes/profileRoutes"));
app.use("/api/user", require("./src/routes/userRoutes"));
app.use("/api/workout", require("./src/routes/workoutRoutes"));
app.use("/api/mealplan", require("./src/routes/mealPlanRoutes"));
app.use("/api/recipes", require("./src/routes/recipeRoutes"));
app.use("/api/products", require("./src/routes/productRoutes"));
app.use("/api", require("./src/routes/orderRoutes.js"));
app.use("/api/category", require("./src/routes/productCategoryRoutes.js"));
app.use("/api/workout-type", require("./src/routes/workoutTypeRoutes"));
app.use("/api/contact", require("./src/routes/contactRoutes"));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
