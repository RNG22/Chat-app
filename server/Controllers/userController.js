const userModel=require("../Models/userModel");
const bcrypt=require("bcrypt");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const createToken=(_id)=>{
const jwtkey=process.env.JWT_SECRET_KEY;
return jwt.sign({_id},jwtkey,{expiresIn:"3d"})
}
// register user
const registerUser=async (req,res)=>{
    try{
    const {name,email,password}=req.body;
    let user=await userModel.findOne({email});
    if(user){
        //400-error in client side
        return res.status(400).json({msg:"user already exists"})
    }
    if(!name || !email || !password){
        return res.status(400).json({msg:"please enter all the fields"})
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({msg:"please enter a valid email"})
    }
    if(!validator.isStrongPassword(password)){
        return res.status(400).json({msg:"password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number and one symbol"})
    }
    user=new userModel({
        name,
        email,
        password
    })
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password,salt);
    await user.save();
    const token=createToken(user._id);
    res.status(201).json({_id:user._id,name,email,token})
    }catch(err){
        console.log(err)
        res.status(500).json({msg:err.message})
    }
}
// login user
const loginUser=async (req,res)=>{
        const {email,password}=req.body;
    try{
        let user=await userModel.findOne({email});
         if(!user){
            return res.status(400).json({msg:"Invalid credentials"})
        }
        const isValidPassword=await bcrypt.compare(password,user.password);
if(!isValidPassword){
    return res.status(400).json({msg:"Invalid credentials"})
}
        const token=createToken(user._id);
        res.status(200).json({_id:user._id,name:user.name,email,token})

    }catch(err){
        console.log(err)
        res.status(500).json({msg:err.message})
    }
}

//find user
const findUser=async (req,res)=>{
    const userId=req.params.userId;
    try{
        const user=await userModel.findById(userId);
        if(!user){
            return res.status(404).json({msg:"user not found"})
        }
        res.status(200).json(user)
    }catch(err){
        console.log(err)
        res.status(500).json({msg:err.message})
    }
}
//get users
const getUsers=async (req,res)=>{
    try{
        const users=await userModel.find();
        res.status(200).json(users)
    }catch(err){
        console.log(err)
        res.status(500).json({msg:err.message})
    }
}

module.exports={registerUser,loginUser,findUser,getUsers}