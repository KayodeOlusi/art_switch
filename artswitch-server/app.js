require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const socket = require("socket.io");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const postsRoutes = require("./routes/posts");
const connectDB = require("./config/db/dbConn");
const { verifyJWT } = require("./middlewares/auth");
const { handleUserMessage } = require("./controllers/messages");

connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", verifyJWT, postsRoutes);
app.use("/api/user", verifyJWT, userRoutes);
app.use("/api/chat", verifyJWT, chatRoutes);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });

  const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
    },
    pingTime: 30000,
  });

  io.on("connection", socket => {
    console.log("Socket connected");

    socket.on("chatroom", user => {
      socket.join(user?._id);
      socket.emit("connected");
    });

    socket.on("join chat", room => {
      socket.join(room);
      console.log("user joined room " + room);
    });

    socket.on("new message", async messageData => {
      const message = await handleUserMessage(messageData);
      if (!message) return;

      io.emit(`message received ${messageData.id}`, message.message);
    });
  });
});
