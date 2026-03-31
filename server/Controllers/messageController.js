//createMessage
//getMessages
const messageModel=require("../Models/messageModel");
const createMessage=async (req,res)=>{
    try{
        const {chatId,senderId,text}=req.body;
        if(!chatId || !senderId || !text){
            return res.status(400).json({message:"please enter all the fields"})
        }
        const message=new messageModel({
            chatId,
            senderId,
            text
        })
        const response=await message.save();
        res.status(201).json(response)
    }catch(err){
        console.log(err)
        res.status(500).json({message: err.message})
    }
}
const getMessages=async (req,res)=>{
    const chatId=req.params.chatId;
    try{
        const messages=await messageModel.find({chatId});
        res.status(200).json(messages)
    }catch(err){
        console.log(err)
        res.status(500).json({message: err.message})
    }
}
module.exports={createMessage,getMessages}
