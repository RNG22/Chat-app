const { Server } = require("socket.io");

const io = new Server({ cors:"http://localhost:5173" });

let onlineUsers = [];
io.on("connection", (socket) => {
  console.log("a user connected",socket.id);

//   listen for incoming messages from clients
    socket.on("add_newuser", (userId) => {
     !onlineUsers.some((user) => user.userId === userId) &&
     onlineUsers.push({ userId, socketId: socket.id });
     console.log("Online users:", onlineUsers);
    io.emit("online_users", onlineUsers);
    });

//add messaee listener
socket.on("send_message", (message) => {
    console.log("Received message:", message);
    const user = onlineUsers.find((user) => user.userId === message.receipientId);
    if (user) {
        console.log("Sending message to user with socket ID:", user.socketId);
        io.to(user.socketId).emit("receive_message", message);
    } else {
        console.log("User not online, cannot send message");
    }
});

socket.on("disconnect", () => {
    console.log("a user disconnected",socket.id);
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("Online users:", onlineUsers);
    io.emit("online_users", onlineUsers);
  });
});

io.listen(3000);