const express=require("express");
const cors=require("cors");
const userRoute=require("./Routes/userRoute");
const chatRoute=require("./Routes/chatRoute");
const messageRoute=require("./Routes/messageRoute");
const app=express();
app.use(express.json())
app.use(cors());
app.use("/api/users",userRoute);
app.use("/api/chats",chatRoute);
app.use("/api/messages",messageRoute);

require("dotenv").config();
const mongoose=require("mongoose");
const { Server } = require("socket.io");
// crud
// app.get("/",(req,res)=>{
//     res.send("hello world")
// })

const port=process.env.PORT || 2000;
const uri=process.env.ATLAS_URI;
const expressServer=app.listen(port,(req,res)=>{
    console.log(`server is running on ${port}`)
})

mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connected to database")
}).catch((err)=>{
    console.log(err)
})

const io = new Server(expressServer,{ cors:process.env.CLIENT_URL});


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
        io.to(user.socketId).emit("getNotification", {
                senderId: message.senderId,
                isRead: false,
                date: new Date(),
        });
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
