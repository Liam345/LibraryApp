var bcrypt = require('bcrypt');
var bCrypt = require('bcrypt-nodejs');
const saltRounds = 8;

/*
Phase it out
*/
module.exports = function(passport, user){
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField:'email',
            passwordField:'password',
            passReqToCallback:true //passes entire request to Callback
        },

        function(req,email,password,done){
            // var generateHash = function(password) {  
            //     return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);            
            // };
           // User.findOne({
                // where: {
                //     email:email
                // },function(err,user){
                    // if(err) {return done(err);}
                    // if(user){
                    //     return done(null,false,{
                    //         message:'That email is already taken'
                    //     });
                    // }
           //         else {
                        bcrypt.hash(password,saltRounds).then(function(hashPassword){
                            //var hashPassword = generateHash(password);
                            User.create({
                                firstName:req.body.firstName,
                                lastName:req.body.lastName,
                                email:email,
                                password:hashPassword
                            })
                            .then(function(newUser){
                                if(!newUser){
                                    return done(null,false);
                                }
                                if (newUser){
                                    return done(null,newUser);
                                }
                            })
                            .catch(err => done(err));
                        }
                    ).catch(err=>console.log('Could not hash password'));
                    //}
             //   }
       //     })
        }
    ));

    //LOCAL SIGNIN
passport.use('local-signin', new LocalStrategy(
 
    {
 
        // by default, local strategy uses username and password, we will override with email
 
        usernameField: 'email',
 
        passwordField: 'password',
 
        passReqToCallback: true // allows us to pass back the entire request to the callback
 
    },
 
 
    function(req, email, password, done) {
        var User = user;
 
        var isValidPassword = function(userpass, password) {
 
            return bCrypt.compareSync(password, userpass);
 
        }
        console.log(User);
        User.findOne({
            where: {
                email: email
            }
        }).then(function(user) {
 
            if (!user) {
 
                return done(null, false, {
                    message: 'Email does not exist'
                });
 
            }
 
            if (!isValidPassword(user.password, password)) {
 
                return done(null, false, {
                    message: 'Incorrect password.'
                });
 
            }
 
 
            var userinfo = user.get();
            return done(null, userinfo);
 
 
        }).catch(function(err) {
 
            console.log("Error:", err);
 
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
 
        });
 
 
    }
 
));

//serialize
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// // deserialize user 
passport.deserializeUser(function(id, done) {
 
    User.findById(id).then(function(user) {
 
        if (user) {
 
            done(null, user.get());
 
        } else {
 
            done(user.errors, null);
 
        }
 
    });
});
}