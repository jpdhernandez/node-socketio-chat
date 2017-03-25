const socket = io();

 function scrollToBottom() {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child')
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on("connect", () => {
  const params = jQuery.deparam(window.location.search);

  socket.emit("join", params, (err) => {
    if (err) {
      alert(err);

      window.location.href = "/";
    } else {
      console.log("No error");
    }
  });
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("updateUserList", () => {

});

socket.on("newMessage", (message) => {
  const formattedTime = moment(message.createdAt).format("h:mm a");
  const template = jQuery("#message-template").html();
  const html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });

  jQuery("#messages").append(html);
  
  scrollToBottom();
})

socket.on("newLocationMessage", (message) => {
  const formattedTime = moment(message.createdAt).format("h:mm a");
  const template = jQuery("#location-message-template").html();
  const html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  });

  jQuery("#messages").append(html);
  
  scrollToBottom();
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