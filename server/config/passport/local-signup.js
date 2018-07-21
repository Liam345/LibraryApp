const jwt = require('jsonwebtoken');
const User = require('../../models').User;
const PassportLocalStrategy = require('passport-local').Strategy;


//Sign Up for the first time
module.exports = new PassportLocalStrategy({
    usernameField:'email',
    passwordField:'password',
    session:false,
    passReqToCallback:true //passes entire request to Callback
},

function(req,email,password,done){
        
                    User.create({
                        firstName:req.body.firstName.trim(),
                        lastName:req.body.lastName.trim(),
                        email:email.toLowerCase().trim(),
                        password:password.trim()
                    })
                    .then(function(newUser){
                        if(!newUser){
                            return done(null,false,{message:'Incorrect Credentials'});
                        }
                        if (newUser){
                            return done(null,newUser);
                        }
                    })
                    .catch(function(err){ return done(err)});
                }
);

