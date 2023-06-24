require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/posts");
const connectDB = require("./config/db/dbConn");
const { verifyJWT } = require("./middlewares/auth");

connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
