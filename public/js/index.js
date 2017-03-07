const socket = io();

socket.on("connect", function() {
  console.log("connected to server");

  socket.emit("createMessage", {
    from: "Julian",
    text: "Yup, that's cool"
  });
});

socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {
  console.log("newMessage", message);
})