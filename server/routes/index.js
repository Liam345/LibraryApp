const booksController = require('../controllers').books;
const usersController = require('../controllers').users;
const express = require('express');
const router = new express.Router();

//module.exports = (app,passport) => {
    router.get('/',(req,res) => res.status(200).send({
        message:'Welcome to the Library API',
    }));

    // router.get('/success',(req,res) => res.status(200).send({
    //     message:'Sucess',
    // }));

    // router.get('/failure',(req,res) => res.status(401).send({
    //     message:'Failure',
    // }));

    router.post('/books', booksController.create);
    router.get('/books', booksController.list);

    router.put('/books/:bookId',booksController.update);
    router.delete('/books/:bookId',booksController.destroy);

    router.post('/books/contact/:bookId',booksController.contact);

    
    // router.post('/signup',passport.authenticate('local-signup',{
    // successRedirect: '/success',
    // failureRedirect: '/api/failure'
    // }));
    router.post('/users',usersController.create);
    router.get('/users',usersController.list);
    router.delete('/users/:userId',usersController.destroy);

    module.exports = router;

    // router.post('/api/login',passport.authenticate('local-signin',
    // function(req,res){
    //     if(!req.user){
    //         res.status(200).send({message:'Email is incorrect'})
    //     }
    //     else {
    //         res.status(200).send({message:'User is signed in'})
    //     }
    // }));
