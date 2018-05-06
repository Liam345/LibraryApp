const booksController = require('../controllers').books;
const authorsController = require('../controllers').authors;

module.exports = (app) => {
    app.get('/api',(req,res) => res.status(200).send({
        message:'Welcome to the Library API',
    }));

    app.post('/api/books', booksController.create);
    app.get('/api/books', booksController.list);
    app.get('/api/books/:bookId', booksController.retrieve);
    app.put('/api/books/:bookId',booksController.update);
    app.delete('/api/books/:bookId',booksController.destroy);


    app.post('/api/authors', authorsController.create);
    app.get('/api/authors', authorsController.list);
    app.get('/api/authors/:authorId', authorsController.retrieve);
    app.put('/api/books/:authorId',authorsController.update);
    app.delete('/api/books/:authorId',authorsController.destroy);
}