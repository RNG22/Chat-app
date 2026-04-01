import { createContext } from "react";
import { BaseUrl,getRequest,PostRequest } from "../utils/services";
import { useState } from "react";
import { useEffect } from "react";
export const ChatContext=createContext();

export const ChatContextProvider=({children,user})=>{
const [userChats,setUserChats]=useState(null);
const [isUserChatsLoading,setIsUserChatsLoading]=useState(false);
const [userChatsError,setUserChatsError]=useState(null);

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

return (
    <ChatContext.Provider value={{userChats,isUserChatsLoading,userChatsError}}>{children}</ChatContext.Provider>
)
}
