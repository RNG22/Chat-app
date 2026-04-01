import { useEffect } from "react";
import { useState } from "react";
import { BaseUrl, getRequest } from "../utils/services";

export const useFetchReciepient = (chat,user) => {   
    // This is a placeholder for the actual implementation of fetching recipients.
    // You would replace this with your actual logic to fetch recipients from your backend or state management.
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);
   const recipientId=chat?.members.find((id)=>id!==user?._id);
useEffect(() => {
    const getuser = async () => {
        if (!recipientId) {
            // setError({ error: true, message: "Recipient ID not found in chat members" });
            return null;
        }
  // server exposes GET /api/users/:userId
  const response = await getRequest(`${BaseUrl}/Users/find/${recipientId}`);
        if (response.error) {
            setError(response);     
            return;
        }
        setRecipientUser(response);
    }   
        getuser();      
  
  } , [recipientId]);

    return { recipientUser, error };
    
    };

