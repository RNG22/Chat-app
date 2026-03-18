const express=require("express");
const cors=require("cors");
const userRoute=require("./Routes/userRoute");
const app=express();
app.use(express.json())
app.use(cors());
app.use("/api/users",userRoute);


require("dotenv").config();
const mongoose=require("mongoose");

// crud
// app.get("/",(req,res)=>{
//     res.send("hello world")
// })

const port=process.env.PORT || 2000;
const uri=process.env.ATLAS_URI;
app.listen(port,(req,res)=>{
    console.log(`server is running on ${port}`)
})

mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connected to database")
}).catch((err)=>{
    console.log(err)
})
