import { createContext } from "react";
import { BaseUrl,getRequest,PostRequest } from "../utils/services";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
export const ChatContext=createContext();

export const ChatContextProvider=({children,user})=>{
const [userChats,setUserChats]=useState(null);
const [isUserChatsLoading,setIsUserChatsLoading]=useState(false);
const [userChatsError,setUserChatsError]=useState(null);
const [potentialChats,setPotentialChats]=useState([]);

useEffect(() => {
    const getUsers = async () => {
       
            // server route expects /api/chats/potential/:userId
             const response = await getRequest(`${BaseUrl}/users`);
              if (response.error) {
            return setUserChatsError(response);
        }
const pchat=response.filter((u)=>{
    let isChatCreated=false;
    if(user._id===u._id){
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
return (
    <ChatContext.Provider value={{userChats,isUserChatsLoading,userChatsError,potentialChats,createChat}}>{children}</ChatContext.Provider>
)
}
