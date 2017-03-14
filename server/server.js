const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http =  require("http");

const publicPath = path.join(__dirname, "../public");
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);
const {generateMessage} = require("./utils/message");

app.use(express.static(publicPath));

// Listens to an individual connection
io.on("connection", (socket) => {
  console.log("New user connected");

  socket.emit("newMessage", generateMessage("Admin", "Welcome to the Chat App"));

  socket.broadcast.emit("newMessage", generateMessage("Admin", "New User Joined"));

  socket.on("createMessage", (message) => {
    console.log("createMessage", message);

    io.emit("newMessage", generateMessage(message.from, message.text));

  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});