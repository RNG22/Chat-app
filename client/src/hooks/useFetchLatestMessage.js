import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { BaseUrl, getRequest } from "../utils/services";
export const useFetchLatestMessage=(chat)=>{
    const {newMessage,notifications}=useContext(ChatContext);
    const [latestMessage,setLatestMessage]=useState(null);
    
    useEffect(()=>{
const getMessages=async()=>{
    const response=await getRequest(`${BaseUrl}/messages/${chat?._id}`);
if(response.error){
return console.log("error getting message..",error)
}
const lastMessage=response[response?.length-1];
setLatestMessage(lastMessage);
};
getMessages();
},[newMessage,notifications])
return {latestMessage};
};
  