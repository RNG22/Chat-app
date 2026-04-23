import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { BaseUrl, getRequest } from "../utils/services";
export const useFetchLatestMessage=(chat)=>{
    const {newMessage,notifications}=useContext(ChatContext);
    const [latestMessage,setLatestMessage]=useState(null);
    
// useEffect(()=>{
// const getMessages=async()=>{
//     const response=await getRequest(`${BaseUrl}/messages/${chat?._id}`);
// if(response.error){
// return console.log("error getting message..",error)
// }
// const lastMessage=response[response?.length-1];
// setLatestMessage(lastMessage);
// };
// getMessages();
// },[newMessage,notifications])
useEffect(() => {
  const getMessages = async () => {
    if (!chat?._id) return; // ✅ guard

    const response = await getRequest(`/messages/${chat._id}`);

    if (response.error) {
      console.log("error getting message..", response.message);
      return;
    }

    // ✅ safe check
    if (Array.isArray(response) && response.length > 0) {
      const lastMessage = response[response.length - 1];
      setLatestMessage(lastMessage);
    } else {
      setLatestMessage(null);
    }
  };

  getMessages();
}, [chat, newMessage, notifications]);

return {latestMessage};
};
  