import React from 'react'
import { useFetchReciepient } from '../../hooks/useFetchReciepient';
import Avatar from "../../assets/avatar.svg";
import { Stack } from 'react-bootstrap';
const UsersChat = ({chat,user}) => {
    const { recipientUser, error } = useFetchReciepient(chat,user);
    console.log("recipientUser", recipientUser);
  return (
 
 <Stack direction='horizontal' gap={3} className='user-card p-2 justify-content-between mb-3 align-items-start'
 role="button">
   <div className='d-flex'>
    <div className='me-2'>
        <img src={Avatar} alt="avatar" className='avatar' height="35px" />
    </div>
    <div className='text-content'>
   <div className='name'>{recipientUser?.name}</div>
   <div className="text">Text Message</div>
   </div>
   </div>
   <div className="d-flex flex-column align-items-end">
    <div className="date">12/12/2026</div>
    <div className="this-user-notifications">2</div>
    <span className="user-online"></span>
   </div>
     </Stack>
 
  )
}

export default UsersChat;