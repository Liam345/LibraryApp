const booksController = require('../controllers').books;
const usersController = require('../controllers').users;
const paymentsController = require('../controllers').payments;
const addressesController = require('../controllers').addresses;
const ordersController = require('../controllers').orders;

const express = require('express');
const router = new express.Router();

    router.get('/',(req,res) => res.status(200).send({
        message:'Welcome to the Library API',
    }));

    router.post('/books', booksController.create);
    router.get('/books', booksController.list);

    router.put('/books/:bookId',booksController.update);
    router.delete('/books/:bookId',booksController.destroy);

    router.post('/books/contact/:bookId',booksController.contact);

    router.post('/users',usersController.create);
    router.get('/users',usersController.list);
    router.get('/users/:userId',usersController.retrieve);
    router.put('/users/:userId',usersController.update);
    router.delete('/users/:userId',usersController.destroy);


    router.post('/customer',paymentsController.createOrRetrieveCustomer);
    router.put('/charge',paymentsController.create);
    router.get('/charge',paymentsController.list);
    router.get('/charge/customers',paymentsController.listCustomers);

    router.post('/address/:userId',addressesController.create);
    router.get('/address/:userId',addressesController.retrieve);
    router.get('/address/',addressesController.list);
    router.delete('/address/:addressId/:userId',addressesController.destroy);

    router.post('/order/:userId',ordersController.create);
    router.get('/order/:userId',ordersController.retrieve);
    router.get('/order',ordersController.list);
    router.delete('/order/:orderId/:userId',ordersController.destroy);

    module.exports = router;

    