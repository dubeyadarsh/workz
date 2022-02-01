const express=require("express");
const app=express();
const cors=require("cors");
const path =require('path');
const mongoose=require("mongoose");
const user=require("./models/Signupmodel");
const passport = require("passport");
const session = require('express-session');
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
require("dotenv").config();
const port = process.env.PORT || 3001;
const {initializingPassport}=require("./passportConfig.js")
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized: true
}))
//********* */ Passport part authentication**************
initializingPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// IS It Already authenticated ? Let's check it here -->
function isAuthenticated(req,res,done){
  if(req.user){
    return done();

  }
  return false;
}
app.get("/isAuthenticated",isAuthenticated, async(req,res)=>{
  
   
 await res.send(true);
 
})
app.post("/logout",async (req,res)=>{
 await req.logout();
 
  res.send("Logged Out");
})


// *********************************************************
// Database part ***********

mongoose.connect("mongodb+srv://workzone:workzone%40123@cluster0.8pfbz.mongodb.net/workzone?retryWrites=true&w=majority",{
useNewUrlParser:true
}).catch(error=> console.error(error));



app.post("/register",async(req,res)=>{
    const registerName=req.body.registerName;
    const registerMail=req.body.registerMail;
    const registerPass=req.body.registerPass;
    console.log(req.body);
    // console.log("u are called from frontend"+" "+req+" "+registerName+" "+ registerMail+" "+registerPass);
 
    const data=  new user({name:registerName,username:registerMail,password: registerPass});
    console.log(data);
    try{
    await data.save();
    res.send("inserted data");
    }
    catch(err){
    console.log("Error related to Inserting data in database",err);
    }
});
// passport.authenticate('local', { failureRedirect: '/login', failureMessage: true })
app.post('/login', passport.authenticate('local'),(req,res)=>{
 
res.send({isAuthenticated:true});
// console.log(req.body.username);

});


app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ],
}),(req,res)=>{
    console.log("u have been called");
});
app.get('/auth/google/callback', passport.authenticate( 'google'),(req,res)=>{
  console.log("Bahot Sahi beta")

  res.send("doing great obvui");
});
app.listen(port,()=>{
    console.log("Server running at port 3001");
});