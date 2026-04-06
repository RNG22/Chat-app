import { createContext, use } from "react";
import { BaseUrl,getRequest,PostRequest } from "../utils/services";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { io } from "socket.io-client";
export const ChatContext=createContext();

export const ChatContextProvider=({children,user})=>{
const [userChats,setUserChats]=useState(null);
const [isUserChatsLoading,setIsUserChatsLoading]=useState(false);
const [userChatsError,setUserChatsError]=useState(null);
const [potentialChats,setPotentialChats]=useState([]);
const [currentChat,setCurrentChat]=useState(null);
const [messages,setMessages]=useState(null);
const [isMessagesLoading,setIsMessagesLoading]=useState(false);
const [messagesError,setMessagesError]=useState(null);
const [sendTextError,setSendTextError]=useState(null);
const [newMessage,setNewMessage]=useState(null);
const [socket,setSocket]=useState(null);
const [onlineUsers,setOnlineUsers]=useState([]);
console.log("messages", messages);

// initial socket
useEffect(() => {   
    const newSocket=io("http://localhost:3000");
    setSocket(newSocket);
return()=>{
    newSocket.disconnect();
}
}, [user]);
//add user to socket server and listen for online users
useEffect(() => {
    if(socket==null ) return;
        socket.emit("add_newuser", user?._id);
        socket.on("online_users", (onlineUsers) => {
            setOnlineUsers(onlineUsers);
        });
return()=>{
    socket.off("online_users"); 
}
}, [socket]);
//send message through socket
useEffect(() => {
    if(socket==null || newMessage==null) return;
        const receipientId=currentChat?.members?.find((id)=>id!==user?._id);
    socket.emit("send_message", {...newMessage, receipientId });
}, [newMessage]);
//receive message through socket
useEffect(() => {
    if(socket==null) return;
    socket.on("receive_message", (message) => {
        if(message.chatId!=message.chatId) return;
        setMessages((prevMessages)=>[...prevMessages,message]);
    });
return()=>{
    socket.off("receive_message");
}
}, [socket,currentChat]);

// console.log("currentChat", currentChat);
useEffect(() => {
    const getUsers = async () => {
       
            // server route expects /api/chats/potential/:userId
             const response = await getRequest(`${BaseUrl}/users`);
              if (response.error) {
            return setUserChatsError(response);
        }
const pchat=response.filter((u)=>{
    let isChatCreated=false;
    if(user?._id===u._id){
        return false;
    }
    if(userChats){
        isChatCreated= userChats?.some((chat)=>{
           return chat.members[0]===u._id || chat.members[1]===u._id
        });
    }
    return !isChatCreated;
})
        setPotentialChats(pchat);
    
    };
        getUsers();
   
}, [userChats]);

useEffect(() => {
    const getUserChats = async () => {
        if(user?._id){
            setIsUserChatsLoading(true);
        setUserChatsError(null);
             // server route expects /api/chats/:userId
             const response = await getRequest(`${BaseUrl}/chats/${user._id}`);
             setIsUserChatsLoading(false);
              if (response.error) {
            return setUserChatsError(response);
        }
        setUserChats(response);
        }
    };
        getUserChats();
   
}, [user]);

const createChat=useCallback(async (firstId,secondId) => {
const response=await PostRequest
(`${BaseUrl}/chats`,JSON.stringify({firstId,secondId})
);
if(response.error){
    console.error("Error creating chat:", response.message);
    return;
}
setUserChats((prevChats)=>[...prevChats,response])
}, [])

const updateCurrentChat=useCallback((chat)=>{
    setCurrentChat(chat);
}, [])

useEffect(() => {
    const getMessages = async () => {
        // if(currentChat?._id){
            setIsMessagesLoading(true);
        setMessagesError(null);
             // server route expects /api/messages/:chatId
             const response = await getRequest(`${BaseUrl}/messages/${currentChat?._id}`);
             setIsMessagesLoading(false);
              if (response.error) {
            return setMessagesError(response);
        }
        setMessages(response);
        }
    // };
        getMessages();
   
}, [currentChat]);

const sendTextMessage=useCallback(async (textMessage,sender,currentChatId,setTextMessage)=>{
    if(!textMessage.trim()){
        return;
    }
    const response=await PostRequest(`${BaseUrl}/messages`,JSON.stringify
        ({chatId:currentChatId,senderId:sender._id,text:textMessage}))
        if(response.error){
            return sendTextError(response);
        }
        // optimistically update messages list with new message
        setNewMessage(response);
         setMessages((prevMessages)=>[...prevMessages,response]);
        setTextMessage("");
}, [])

return (
    <ChatContext.Provider value={{userChats,isUserChatsLoading,userChatsError,potentialChats,createChat,updateCurrentChat,messages,isMessagesLoading,messagesError,currentChat,sendTextMessage,sendTextError,newMessage, onlineUsers}}>{children}</ChatContext.Provider>
)
}
