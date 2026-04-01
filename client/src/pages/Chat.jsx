import React from 'react'
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

export const Chat = () => {
  const {userChats,isUserChatsLoading,userChatsError}=useContext(ChatContext);
  console.log("userChats", userChats);
  return (
    <div>Chat</div>
  )
}
