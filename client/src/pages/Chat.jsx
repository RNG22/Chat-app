import React from 'react'
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { Container, Stack } from 'react-bootstrap';
import UserChat from '../components/Chat/UsersChat';
import { AuthContext } from '../context/AuthContext';
import { PotentialChats } from '../components/Chat/PotentialChats';
import { ChatBox } from '../components/Chat/ChatBox';
export const Chat = () => {
  const {user}=useContext(AuthContext);
  const {userChats,isUserChatsLoading,updateCurrentChat,showChat, setShowChat}=useContext(ChatContext);
  
  // console.log("userChats", userChats);
  return (
    <Container>
      <PotentialChats/>
      {userChats?.length <1 ? null : 
    (<Stack direction='horizontal' gap={3} className='mb-3 align-items-start'>
  <Stack  className={`messages-box flex-grow-0 pe-3 ${
          showChat ? "hide-mobile" : ""
        }`}
        gap={3}>{isUserChatsLoading && <p>Loading chats...</p>}
  {userChats?.map((chat,index) => 
    (<div key={index} onClick={()=>{updateCurrentChat(chat);setShowChat(true);}}>
      <UserChat chat={chat} user={user} />
      </div>))}
  </Stack>
      <div className={`chat-wrapper ${showChat ? "show-mobile" : ""}`}>
        <ChatBox setShowChat={setShowChat} />
      </div>
    </Stack>)}
   
      </Container>
  )
}
