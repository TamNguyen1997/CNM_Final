const passport = require("passport");
const passport_jwt = require("passport-jwt");
const ExtractJwt =  passport_jwt.ExtractJwt;
const MD5 = require('crypto-js/md5');

const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passport_jwt.Strategy;

const { User } = require("../models/user");

//add local strategy
passport.use(new LocalStrategy({usernameField: "username", session: false}, (username, password, done) => {
    User.find({where:{
                username: username
              }
          })
    .then(async user => {
        user = user.dataValues;
        if (!user) return done(null, false, {message: "Username or Password iuIDs incorret"});
        const encrypted = await MD5(password).toString();

        if(user.password != encrypted){
            return done(null, false, {message: 'Username or Password is incorret'});
        }
        
        delete user.password;
        return done(null, user);
    })
    .catch(err => {
        return done(err)
    })
}));

//add jwt strategy
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:  "process.env.TOKEN_SECRET_KEY",
}; 

passport.use(new JWTStrategy(opts, (payload, done) => {
    if(payload.rt) {
        return done(null, false, { message: "Invalid token!" });
    } else {
       return done(null, payload);
    }
}));