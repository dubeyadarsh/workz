const express=require("express");
const app=express();
const cors=require("cors");
const path =require('path');
const LocalStrategy=require("passport-local").Strategy;
const mongoose=require("mongoose");

console.log("welcome to backend");
const user=require("./models/Signupmodel");
const { session } = require("passport");
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
require("dotenv").config();

const port = process.env.PORT || 3001;
app.use(session({
    secret:'keyboard cat',
    resave:false,
    
}))

// Database part ***********

mongoose.connect("mongodb+srv://workzone:workzone%40123@cluster0.8pfbz.mongodb.net/workzone?retryWrites=true&w=majority",{
useNewUrlParser:true
}).catch(error=> console.error(error));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

app.post("/register",  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),async(req,res)=>{
    const registerName=req.body.registerName;
    const registerMail=req.body.registerMail;
    const registerPass=req.body.registerPass;
    console.log(req.body);
    // console.log("u are called from frontend"+" "+req+" "+registerName+" "+ registerMail+" "+registerPass);
 
    const data=  new user({username:registerName,usermail:registerMail,password: registerPass});
    console.log(data);
    try{
    await data.save();
    res.send("inserted data");
    }
    catch(err){
    console.log("Error related to Inserting data in database",err);
    }
});

app.listen(port,()=>{
    console.log("Server running at port 3001");
});