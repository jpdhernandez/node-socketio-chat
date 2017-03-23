const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http =  require("http");

const publicPath = path.join(__dirname, "../public");
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);
const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");

app.use(express.static(publicPath));

// Listens to an individual connection
io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("join", (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback("Name and room name are required.");
    }
    
    socket.join(params.room);
    socket.emit("newMessage", generateMessage("Admin", "Welcome to the Chat App"));
    socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", `${params.name} has joined.`));
    callback();
  });

  socket.on("createMessage", (message, callback) => {
    console.log("createMessage", message);

    io.emit("newMessage", generateMessage(message.from, message.text));
    callback();
  });

  socket.on("createLocationMessage", (coords) => {
    io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});