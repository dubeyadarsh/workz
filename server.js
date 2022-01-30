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
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const {initializingPassport}=require("./passportConfig.js")
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized: true
}))
//********* */ Passport part authentication**************
// initializingPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

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

const GOOGLE_CLIENT_ID = "506153696912-adi9c9qb2an7ut8gnapud0mr37i4jhs7.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"
authUser = (request, accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}

//Use "GoogleStrategy" as the Authentication Strategy
passport.use(new GoogleStrategy({
  clientID:     GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/google/callback",
  passReqToCallback   : true
}, authUser));


passport.serializeUser( (user, done) => { 
  console.log(`\n--------> Serialize User:`)
  console.log(user)
   // The USER object is the "authenticated user" from the done() in authUser function.
   // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.  

  done(null, user)
} )


passport.deserializeUser((user, done) => {
      console.log("\n--------- Deserialized User:")
      console.log(user)
      // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
      // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.

      done (null, user)
}) 
app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ]
}));
app.get('/auth/google/callback', passport.authenticate( 'google'),(req,res)=>{
  console.log("Bahot Sahi beta")

  res.send("doing great obvui");
});
app.listen(port,()=>{
    console.log("Server running at port 3001");
});