const express = require('express');
const validator = require('validator');
const passport = require('passport');
const router = new express.Router();

/**
 * Validate the Sign up form
 * 
 * @param {object} payload - thee HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation
 *                    result, error tips, and global message for the whole form 
 */
function validateSignupForm(payload){
    const errors = {};
    let isFormValid = true;
    let message = '';

    if(!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)){
        isFormValid = true;
        errors.email = 'Please provide a valid email address'
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
        isFormValid = false;
        errors.password = 'Password must have at least 8 characters.';
      }
    
    if (!payload || typeof payload.firstName !== 'string' || payload.firstName.trim().length === 0) {
        isFormValid = false;
        errors.firstName = 'Please provide your First Name.';
    }

    if (!payload || typeof payload.lastName !== 'string' || payload.lastName.trim().length === 0) {
        isFormValid = false;
        errors.lastName = 'Please provide your Last Name.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success:isFormValid,
        message,
        errors
    };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';
  
    if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
      isFormValid = false;
      errors.email = 'Please provide your email address.';
    }
  
    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
      isFormValid = false;
      errors.password = 'Please provide your password.';
    }
  
    if (!isFormValid) {
      message = 'Check the form for errors.';
    }
  
    return {
      success: isFormValid,
      message,
      errors
    };
  }

router.post('/login',(req,res,next)=> {
    const validationResult = validateLoginForm(req.body);
    if (!validationResult.success){
        return res.status(400).json({
            success:false,
            message:validationResult.message,
            errors:validationResult.errors
        })
    }
    // else {
    //     return res.status(200).json({
    //         sucess:true,
    //         message:'sucess',
    //         errors:'success'
    //     })
    // }
    return passport.authenticate('local-login',(err,token,userData)=>{
        if(err){
            if(err.name === 'IncorrectCredentialsError'){
                return res.status(400).json({
                    success:false,
                    message:err.message
                })
            }

            return res.status(400).json({
                success:false,
                message:'Could not process the form'
            })
        }

        return res.json({
            success:true,
            message:'You have successfully logged in!',
            token,
            user:userData
        });
    })(req,res,next);
})

router.post('/signup',(req,res,next)=>{
    const validationResult = validateSignupForm(req.body);
    if(!validationResult.success){
        return res.status(400).json({
            success:false,
            message:validationResult.message,
            errors:validationResult.errors
        })
    }

    return passport.authenticate('local-signup',(err,user,info)=>{
        if(err){
            /* ToDO- Catch duplicate email errors
            */
           return res.status(400).json({
               success:false,
               message:'Could not process the form',
               //Gets errors from Sequelize error data structure
               errors: err.errors[0].message
           });
        }

        if(!user){
            return res.status(400).json({
                success:false,
                message:'Could not process the form',
                errors:info.message,
            });
        }

        return res.status(200).json({
            success: true,
            message: 'You have successfully signed up! Now you should be able to log in.'
          });

    })(req, res, next);
})

module.exports = router;
