const jwt = require('jsonwebtoken');
const User = require('../../models').User;
const PassportLocalStrategy = require('passport-local').Strategy;


/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
    usernameField:'email',
    passwordField:'password',
    session:false,
    passReqToCallback:true
}, (req,email,password,done)=> {
    const userData = {
        email:email.trim().toLowerCase(),
        password:password.trim()
    };
    console.log("abc");
    console.log(userData.email);
    //find user by email address
    // return User.findOne({where:{email:userData.email}}, (err,user)=>{
    //     if(err) {return done(err);}

    //     if(!user){
    //         const error = new Error('Incorrect email or Password');
    //         error.name = 'IncorrectCredentialsError';
    //         return done(error);
    //     }

    //     //check if hashed user's password is equal to the value saved in the database
    //     return user.comparePassword(userData.password, (err,isMatch) => {
    //         if(err) {return done(err);}

    //         if(!isMatch){
    //             const error = new Error('Incorrect email or password');
    //             error.name = 'IncorrectCredentialsError';
    //             return done(error);
    //         }

    //         const payload = {
    //             sub : user.id
    //         }

    //         // create a token string
    //         const token = jwt.sign(payload, process.env.jwtSecret);
    //         const data = {
    //             firstName: user.firstName,
    //             lastName: user.lastName
    //         };
    //             return done(null, token, data);
    //     })
    // })



    return User.findOne({where:{email:userData.email}}).then(user => {
        if(!user){
            const error = new Error('Incorrect email or Password');
            error.name = 'IncorrectCredentialsError';
            return done(error);
        }

        //check if hashed user's password is equal to the value saved in the database
        return user.comparePassword(userData.password, (err,isMatch) => {
            if(err) {return done(err);}

            if(!isMatch){
                const error = new Error('Incorrect email or password');
                error.name = 'IncorrectCredentialsError';
                return done(error);
            }

            const payload = {
                sub : user.id
            }

            // create a token string
            const token = jwt.sign(payload, process.env.JWT_SECRET);
            const data = {
                id:user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            };
                return done(null, token, data);
        })
        
    })
})