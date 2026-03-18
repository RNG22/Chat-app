const express=require("express");
const cors=require("cors");
const app=express();
app.use(express.json())
app.use(cors());


const port=process.env.PORT || 8000;
app.listen(port,(req,res)=>{
    console.log(`server is running on ${port}`)
})