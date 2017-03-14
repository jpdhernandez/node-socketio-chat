const socket = io();

socket.on("connect", function() {
  console.log("connected to server");
});

socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {
  console.log("newMessage", message);
  const li = jQuery("<li></li>");

  li.text(`${message.from}: ${message.text}`);

  jQuery("#messages").append(li);
})

socket.emit("createMessage", {
  from: "TestUser",
  text: "Hello this is TestUser"
}, (data) => {
  console.log("Got it", data);
});

jQuery("#message-form").on("submit", (e) => {
  e.preventDefault();

  socket.emit("createMessage", {
    from: "User",
    text: jQuery("[name=message]").val()
  }, () => {

  });
})