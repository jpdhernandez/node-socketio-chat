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

socket.on("newLocationMessage", (message) => {
  const li = jQuery("<li></li>");
  const a =  jQuery("<a target='_blank'>My Current Location</a>");

  li.text(`${message.from}: `);
  a.attr("href", message.url);
  li.append(a);
  jQuery("#messages").append(li);
});

jQuery("#message-form").on("submit", (e) => {
  e.preventDefault();

  const messageTextbox = jQuery("[name=message]");

  socket.emit("createMessage", {
    from: "User",
    text: messageTextbox.val()
  }, () => {
    messageTextbox.val("");
  });
});

const locationButton = jQuery("#send-location");
locationButton.on("click", () => {
  if(!navigator.geolocation) {
    return alert("Geolocation not supported by you browser.");
  }

  locationButton.attr("disabled", "disabled").text("Sendling location...");

  navigator.geolocation.getCurrentPosition((position) => {
    locationButton.removeAttr("disabled").text("Send location");

    socket.emit("createLocationMessage", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    locationButton.removeAttr("disabled").text("Send location");;
    alert("Unable to fetch location.");
  });
});