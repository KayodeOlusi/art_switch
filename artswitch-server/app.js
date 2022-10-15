require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db/dbConn");
const bodyParser = require("body-parser");
const auth_routes = require("./routes/auth");
const mongoose = require("mongoose");

connectDB();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", auth_routes);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
