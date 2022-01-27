const mongoose=require("mongoose");
const SignupSchema=new mongoose.Schema({
 username:{
    type:String,
    required:true
 },
 usermail:{
    type:String,
    required:true
 },
 password:{
    type:String,
    required:true
 }
});
const user=mongoose.model("user",SignupSchema);
module.exports=user;