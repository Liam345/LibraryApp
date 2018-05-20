const booksController = require('../controllers').books;

module.exports = (app) => {
    app.get('/api',(req,res) => res.status(200).send({
        message:'Welcome to the Library API',
    }));

    app.post('/api/books', booksController.create);
    app.get('/api/books', booksController.list);

    app.put('/api/books/:bookId',booksController.update);
    app.delete('/api/books/:bookId',booksController.destroy);

    app.post('/api/books/contact/:bookId',booksController.contact);
}