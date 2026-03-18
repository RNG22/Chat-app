const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{type:String,required:true, minlength:3, maxlength:30},
    email:{type:String,required:true, minlength:3, maxlength:200, unique:true},
    password:{type:String,required:true, minlength:3, maxlength:1024},
    // picture:{type:String,default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
},{
    timestamps:true
})

const userModel=mongoose.model("User",userSchema);
module.exports=userModel;    