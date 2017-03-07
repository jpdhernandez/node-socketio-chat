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
    from: "julian@example.com",
    text: "Cool, bro",
    createdAt: 260217
  });

  socket.on("createMessage", (message) => {
    console.log("createMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});