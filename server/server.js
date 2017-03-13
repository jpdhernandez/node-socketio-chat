const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http =  require("http");

const publicPath = path.join(__dirname, "../public");
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

// Listens to an individual connection
io.on("connection", (socket) => {
  console.log("New user connected");

    socket.emit("newMessage", {
      from: "Admin",
      text: "Welcome to the Chat App",
      createdAt: new Date().getTime
    })

    socket.broadcast.emit("newMessage", {
      from: "Admin",
      text: "New User Joined",
      createdAt: new Date().getTime
    });

  socket.on("createMessage", (message) => {
    console.log("createMessage", message);

    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});