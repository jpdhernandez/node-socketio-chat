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

  socket.emit("newEmail", {
    from: "julian@example.com",
    text: "Hey, this an email!",
    createdAt: 260217
  });

  socket.on("createEmail", (newEmail) => {
    console.log("createEmail", newEmail);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});