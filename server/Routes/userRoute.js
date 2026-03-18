const express=require("express");
const { registerUser,loginUser,findUser,getUsers } = require("../Controllers/userController");
const router=express.Router();
// const userModel=require("../Models/userModel");
// const bcrypt=require("bcryptjs");
// const jwt=require("jsonwebtoken");

// router.post("/register",async(req,res)=>{
//     try{
//         const {name,email,password}=req.body;
//         if(!name || !email || !password){
//             return res.status(400).json({msg:"please enter all the fields"})
//         }
//         const user=await userModel.findOne({email});
//         if(user){
//             return res.status(400).json({msg:"user already exists"})
//         }
//         const salt=await bcrypt.genSalt(10);
//         const hashPassword=await bcrypt.hash(password,salt);
//         const newUser=new userModel({
//             name,
//             email,
//             password:hashPassword
//         })
//         await newUser.save();
//         res.status(201).json({msg:"user created successfully"})
//     }catch(err){
//         res.status(500).json({msg:err.message})
//     }
// })
// router.post("/register",(req,res)=>{
//     res.send("register")
// })  
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/find/:userId",findUser);
router.get("/",getUsers);
module.exports=router;