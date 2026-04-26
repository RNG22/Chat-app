import React, { useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { useFetchReciepient } from '../../hooks/useFetchReciepient';
import { Stack } from 'react-bootstrap';
import moment from 'moment';
import InputEmoji from 'react-input-emoji';

export const ChatBox = () => {
    const {user}=useContext(AuthContext);
    const {currentChat, messages,isMessagesLoading,messagesError,sendTextMessage,sendTextError,newMessage,showChat, setShowChat}=useContext(ChatContext);
    const {recipientUser}=useFetchReciepient(currentChat,user);
    const [textMessage,setTextMessage]=useState("");
    const scroll=useRef()

// console.log("text", textMessage);

useEffect(() => {
    scroll.current?.scrollIntoView({behavior:"smooth"});
}, [messages])

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
    <div className='chat-header-container d-flex'>
    <span className="icon"><span className="icon" onClick={() => setShowChat(false)}>
  <i
    className="fa-solid fa-angle-left"
    style={{ color: "rgb(72, 112, 223);" }}
  ></i>
</span></span>
        <div className="chat-header"> <strong>{recipientUser?.name}</strong></div></div>
    <Stack gap={3} className='messages'>
{messages && messages.map((message,index)=>
<Stack key={index} 
className={`${message.senderId===user?._id ? "message self align-self-end flex-grow-0" : "message self align-self-start flex-grow-0"}`}
ref={scroll}
>
  <span>{message.text}</span>
  <span className='message-footer'>{moment(message.createdAt).calendar()}</span>
  </Stack>)} 
    </Stack>
    <Stack direction='horizontal' gap={2} className='chat-input flex-grow-0'>
    <InputEmoji
  value={textMessage}
  onChange={setTextMessage} fontFamily='nunito' borderColor='rgba(72,112,223,0.2)'
  onEnter={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}
  placeholder="Type a message"
/>
    <button onClick={()=>sendTextMessage(textMessage,user,currentChat._id,setTextMessage)} className='send-btn'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
</svg></button> 
    </Stack>
    </Stack>
  )
}
