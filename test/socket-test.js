const { io } = require("socket.io-client");

const socket = io("http://localhost:4000"); // connect ke server NestJS

const conversationId = "<conversationId>";
const senderId = "<userIdA>";

socket.on("connect", () => {
  console.log("Connected to server");

  // Kirim pesan
  socket.emit("send_message", {
    conversationId,
    senderId,
    content: "Hello from terminal!"
  });
});

socket.on(`message_${conversationId}`, (msg) => {
  console.log("New message:", msg);
});

socket.on("disconnect", () => {
  console.log("Disconnected");
});
