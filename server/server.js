const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http =  require("http");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users} = require("./utils/users");

const publicPath = path.join(__dirname, "../public");
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

// Listens to an individual connection
io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("join", (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback("Name and room name are required.");
    }
    
    socket.join(params.room);

    // When a user join the room, remove them from potential previous rooms and re-add them
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    // Update user list in the sidebar
    io.to(params.room).emit("updateUserList", users.getUserList(params.room));
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
    const user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("updateUserList", users.getUserList(user.room));
      io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left the room`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});