import React from 'react'
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { Container, Stack } from 'react-bootstrap';
import UserChat from '../components/Chat/UsersChat';
import { AuthContext } from '../context/AuthContext';
export const Chat = () => {
  const {user}=useContext(AuthContext);
  const {userChats,isUserChatsLoading,userChatsError}=useContext(ChatContext);
  // console.log("userChats", userChats);
  return (
    <Container>{userChats?.length <1 ? null : 
    (<Stack direction='horizontal' gap={3} className='mb-3 align-items-start'>
  <Stack className='messages-box flex-grow-0 pe-3' gap={3}>{isUserChatsLoading && <p>Loading chats...</p>}
  {userChats?.map((chat,index) => (<div key={index}><UserChat chat={chat} user={user} /></div>))}
  </Stack>
    <p>Chatbox</p>
    </Stack>)}
   
      </Container>
  )
}
