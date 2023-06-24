require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const auth_routes = require("./routes/auth");
const posts_routes = require("./routes/posts");
const connectDB = require("./config/db/dbConn");

connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", auth_routes);
app.use("/api/posts", posts_routes);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
