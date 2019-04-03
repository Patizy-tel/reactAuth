const JWTStrategy = require('passport-jwt').Strategy ;
const ExtractJwt =  require('passpor-jwt').ExtractJwt ;
const monngoose =  require('mongoose') ;
const User =  require('../models/User')
const config =  require('./keys')
const opt = {};


opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opt.secrete = config.secrete ;
 
module.exports = passport =>{
    passport.use( new JWTStrategy(opt ,(jwt_payload ,done) =>{
        User.findById(jwt_payload.id)
            .then(user =>{
                if(user){
                    return done(null, user)
                }
                return done(null , false)
            })
            .catch(err=>console.log(err.message))
    }))
}