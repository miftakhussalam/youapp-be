const { io } = require("socket.io-client");
const readline = require("readline");

// CONFIGURATION
const SERVER_URL = "http://localhost:4000"; // URL Socket.IO NestJS
const conversationId = "64f8a1b2c3d4e5f678901234";   // masukkan conversationId dari DB
const senderId = process.argv[2];            // jalankan: node cli-chat.js <userId>

// Setup readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

// Connect ke Socket.IO server
const socket = io(SERVER_URL);

socket.on("connect", () => {
  console.log(`Connected as user ${senderId}`);
  rl.prompt();
});

// Terima pesan realtime
socket.on(`message_${conversationId}`, (msg) => {
  if(msg.sender !== senderId) {
    console.log(`\n[${msg.sender}] ${msg.content}`);
    rl.prompt();
  }
});

// Input pesan dari terminal
rl.on("line", (line) => {
  if(line.trim() === "") return rl.prompt();

  socket.emit("send_message", {
    conversationId,
    senderId,
    content: line.trim(),
  });

  rl.prompt();
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
  process.exit();
});
