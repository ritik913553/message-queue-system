import passport from "passport";
import googleStrategy from "../passport/googleStrategy.js";

passport.use(googleStrategy);

passport.serializeUser((userData, done) => {
  if (userData) {
    
    done(null, userData); 
  } else {
    done(new Error("No user found"), null);
  }
});

passport.deserializeUser((user, done) => {
  done(null,user)
});

export default passport;
