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
const [notifications,setNotifications]=useState([]);
const [allUsers,setAllUsers]=useState([]);
console.log("notifications", notifications);

// initial socket
useEffect(() => {   
    const newSocket=io(import.meta.env.VITE_SOCKET_URL);
    setSocket(newSocket);
return()=>{
    newSocket.disconnect();
}
}, [user]);
//add user to socket server and listen for online users
useEffect(() => {
    if (!socket) return;
    // only register user on socket when we have a valid user id
    if (user?._id) {
        socket.emit("add_newuser", user._id);
    }
    socket.on("online_users", (onlineUsers) => {
        setOnlineUsers(onlineUsers);
    });
    return () => {
        socket.off("online_users");
    };
}, [socket, user]);
//send message through socket
useEffect(() => {
    if(socket==null || newMessage==null) return;
        const receipientId=currentChat?.members?.find((id)=>id!==user?._id);
    socket.emit("send_message", {...newMessage, receipientId });
}, [newMessage]);
//receive message & notifications from socket
useEffect(() => {
    if(socket==null) return;
    socket.on("receive_message", (res) => {
        if(currentChat?._id !== res.chatId) return;
        setMessages((prevMessages)=>[...prevMessages,res]);
    });
    socket.on("getNotification", (res) => {
        const isChatOpen=currentChat?.members.some((id)=>id===res.senderId)
        if(isChatOpen){
        setNotifications((prevNotifications)=>[{...res,isRead:true},...prevNotifications]);
    }else{
        setNotifications((prevNotifications)=>[res,...prevNotifications]);
    }
    });

return()=>{
    socket.off("receive_message");
    socket.off("getNotification");
}
}, [socket,currentChat]);

// console.log("currentChat", currentChat);
useEffect(() => {
  const getUsers = async () => {
    const response = await getRequest("/users");

    if (response.error) {
      return setUserChatsError(response);
    }

    const pchat = response.filter((u) => {
      if (user?._id === u._id) return false;

      const isChatCreated = userChats?.some((chat) =>
        chat.members.includes(u._id)
      );

      return !isChatCreated;
    });

    setPotentialChats(pchat);
    setAllUsers(response);
  };

  getUsers();
}, [userChats, user]);

useEffect(() => {
  const getUserChats = async () => {
    if (!user?._id) return;

    setIsUserChatsLoading(true);
    setUserChatsError(null);

    const response = await getRequest(`/chats/${user._id}`);

    setIsUserChatsLoading(false);

    if (response.error) {
      return setUserChatsError(response);
    }

    setUserChats(response);
  };

  getUserChats();
}, [user, notifications]);
// useEffect(() => {
//     const getUsers = async () => {
       
//             // server route expects /api/chats/potential/:userId
//              const response = await getRequest(`${BaseUrl}/users`);
//               if (response.error) {
//             return setUserChatsError(response);
//         }
// const pchat=response.filter((u)=>{
//     let isChatCreated=false;
//     if(user?._id===u._id){
//         return false;
//     }
//     if(userChats){
//         isChatCreated= userChats?.some((chat)=>{
//            return chat.members[0]===u._id || chat.members[1]===u._id
//         });
//     }
//     return !isChatCreated;
// })
//         setPotentialChats(pchat);
//         setAllUsers(response);
    
//     };
//         getUsers();
   
// }, [userChats]);

// useEffect(() => {
//     const getUserChats = async () => {
//         if(user?._id){
//             setIsUserChatsLoading(true);
//         setUserChatsError(null);
//              // server route expects /api/chats/:userId
//              const response = await getRequest(`${BaseUrl}/chats/${user._id}`);
//              setIsUserChatsLoading(false);
//               if (response.error) {
//             return setUserChatsError(response);
//         }
//         setUserChats(response);
//         }
//     };
//         getUserChats();
   
// }, [user,notifications]);
const createChat = useCallback(async (firstId, secondId) => {
  const response = await PostRequest("/chats", {
    firstId,
    secondId,
  });

  if (response.error) {
    console.error("Error creating chat:", response.message);
    return;
  }

  setUserChats((prevChats) => [...prevChats, response]);

}, []);
// const createChat=useCallback(async (firstId,secondId) => {
// const response=await PostRequest
// (`${BaseUrl}/chats`,JSON.stringify({firstId,secondId})
// );
// if(response.error){
//     console.error("Error creating chat:", response.message);
//     return;
// }
// setUserChats((prevChats)=>[...prevChats,response])
// }, [])

const updateCurrentChat=useCallback((chat)=>{
    setCurrentChat(chat);
}, [])
useEffect(() => {
  const getMessages = async () => {
    if (!currentChat?._id) return;

    setIsMessagesLoading(true);
    setMessagesError(null);

    const response = await getRequest(`/messages/${currentChat._id}`);

    setIsMessagesLoading(false);

    if (response.error) {
      return setMessagesError(response);
    }

    setMessages(response);
  };

  getMessages();
}, [currentChat]);
// useEffect(() => {
//     const getMessages = async () => {
//         // if(currentChat?._id){
//             setIsMessagesLoading(true);
//         setMessagesError(null);
//              // server route expects /api/messages/:chatId
//              const response = await getRequest(`${BaseUrl}/messages/${currentChat?._id}`);
//              setIsMessagesLoading(false);
//               if (response.error) {
//             return setMessagesError(response);
//         }
//         setMessages(response);
//         }
//     // };
//         getMessages();
   
// }, [currentChat]);
const sendTextMessage = useCallback(async (textMessage,sender,currentChatId,setTextMessage) => {
  if (!textMessage.trim()) return;

  const response = await PostRequest("/messages", {
    chatId: currentChatId,
    senderId: sender._id,
    text: textMessage,
  });

  if (response.error) {
    return sendTextError(response);
  }

  // 🔥 optimistic update
  setNewMessage(response);
  setMessages((prev) => [...prev, response]);
  setTextMessage("");

}, []);
// const sendTextMessage=useCallback(async (textMessage,sender,currentChatId,setTextMessage)=>{
//     if(!textMessage.trim()){
//         return;
//     }
//     const response=await PostRequest(`${BaseUrl}/messages`,JSON.stringify
//         ({chatId:currentChatId,senderId:sender._id,text:textMessage}))
//         if(response.error){
//             return sendTextError(response);
//         }
//         // optimistically update messages list with new message
//         setNewMessage(response);
//          setMessages((prevMessages)=>[...prevMessages,response]);
//         setTextMessage("");
// }, [])

const markAllNotificationsAsRead=useCallback((notifications) => {
    const mNotifications=notifications.map((n)=>({...n,isRead:true}));
    setNotifications(mNotifications);
}, [notifications, user])

const markNotificationAsRead=useCallback((n,userChats,user,notifications) => {
    //find the chat related to this notification
    const desiredChat=userChats?.find((chat)=>
    {
        const chatMenbers=[user?._id,n.senderId];
        const isDesiredChat= chat?.members.every((m)=>chatMenbers.includes(m));
        return isDesiredChat;
    })
    //mark notification as read 
    const mNotifications=notifications.map((el)=>{
        if(n.senderId===el.senderId){
            return {...n,isRead:true};
        }else{
            return el;
        }
    });
   updateCurrentChat(desiredChat);
    setNotifications(mNotifications);
}, [])

const markThisUserNotificationsAsRead=useCallback((thisUserNotifications,notifications)=>{
    // mark notifications as read
    const mNotifications=notifications.map((el)=>{
        let notification;
        thisUserNotifications.forEach(n => {
            if(n.senderId===el.senderId){
                notification={...n,isRead:true}
            }else{
                notification=el
            }
        });
        return notification;
    })
    setNotifications(mNotifications)
},[])

return (
    <ChatContext.Provider value={{userChats,isUserChatsLoading,userChatsError,potentialChats
        ,createChat,updateCurrentChat,messages,isMessagesLoading,
        messagesError,currentChat,sendTextMessage,sendTextError,newMessage, onlineUsers,notifications,
        allUsers,markAllNotificationsAsRead,markNotificationAsRead,markThisUserNotificationsAsRead}}>{children}</ChatContext.Provider>
)
}
