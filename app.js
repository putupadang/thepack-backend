// app.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());

// Middleware
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoute");
app.use("/api/user", userRoutes);

const invoiceRoutes = require("./routes/invoiceRoute");
app.use("/api/invoice", invoiceRoutes);

// Database connection
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
