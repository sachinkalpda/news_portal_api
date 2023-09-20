
const passport = require('passport');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/User');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRET_KEY
}

passport.use(new JWTStrategy(opts, async function(jwtPayload,done){
    try {
        // getting requested user
        const user = await User.findById(jwtPayload._id);

        if(user){
            return done(null, user);
        }
        return done(null, false);
        
    } catch (error) {
        console.log('Error in jwt', error);
        return res.status(500).json({
            success : false,
            message : 'Internal Server Error'
        });
    }
}))
