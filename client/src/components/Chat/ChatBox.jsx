import React from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { useFetchReciepient } from '../../hooks/useFetchReciepient';
import { Stack } from 'react-bootstrap';
import moment from 'moment';
export const ChatBox = () => {
    const {user}=useContext(AuthContext);
    const {currentChat, messages,isMessagesLoading,messagesError}=useContext(ChatContext);
    const {recipientUser}=useFetchReciepient(currentChat,user);
    console.log("recipientUser in chatbox", currentChat);
    if(!recipientUser){
        return <p style={{width:"100%"}} className='text-center'>No conversation selected yet...</p>
    }
    if(isMessagesLoading){
        return <p style={{width:"100%"}} className='text-center'>Loading messages...</p>
    }
     if(messagesError){
        return <p style={{width:"100%"}} className='text-center text-danger'>An error occurred while loading messages. Please try again.</p>
    }
  return (
   <Stack gap={4} className='chat-box'>
        <div className="chat-header"><strong>{recipientUser?.name}</strong></div>
    <Stack gap={3} className='messages'>
{messages && messages.map((message,index)=><Stack key={index} className={`${message.senderId===user?._id ? "message self align-self-end flex-grow-0" : "message self align-self-start flex-grow-0"}`}>
  <span>{message.text}</span>
  <span className='message-footer'>{moment(message.createdAt).calendar()}</span>
  </Stack>)} 
    </Stack>
    </Stack>
  )
}
