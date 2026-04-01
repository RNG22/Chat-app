const express=require("express");
const { createChat, findChat, findUsersChats } = require("../Controllers/chatController");
const router=express.Router();

router.post("/",createChat);
router.get("/find/:firstId/:secondId",findChat);
router.get("/:userId",findUsersChats);


module.exports=router;
