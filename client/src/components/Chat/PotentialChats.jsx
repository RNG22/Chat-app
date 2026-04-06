import React from 'react'
import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

export const PotentialChats = () => {
    const {user}=useContext(AuthContext);
    const {potentialChats,createChat, onlineUsers}=useContext(ChatContext);
    // console.log("potentialChats", potentialChats);
  return (
    <>
    <div className="all-users">
        {potentialChats &&  
        potentialChats.map((u,index)=>{return(
        <div key={index} onClick={()=>createChat(user._id, u._id)} className="single-user p-2 mb-3">{u.name}
        <span className={onlineUsers.some((user) => user?.userId === u?._id) ? "user-online" : ""}></span></div>
        )})}    
    </div>
    </>
  )
}
