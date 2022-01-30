const LocalStrategy=require("passport-local").Strategy;
const {  serializeUser} = require("passport");
const user=require("./models/Signupmodel");
exports.initializingPassport=(passport)=>{
    passport.use(new LocalStrategy(
        function(username, password, done) {
          console.log("this function is being called",username);
          user.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (user.password!==password) { return done(null, false); }
            return done(null, user);
          });
        }
      ));
      passport.serializeUser((user,done)=>{
        if(user){
          console.log("Doing great "+user.id);
          return done(null,user.id);
        }
        return done(null,false);
      });
      passport.deserializeUser((id,done)=>{
      user.findById(id,(err,user)=>{
        if(err) return done(null,false);
        return done(null,user);
      })
      });
};