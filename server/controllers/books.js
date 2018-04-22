const Book = require('../models').Book;

module.exports = {
    create(req,res){
        return Book
        .create({
            title:req.body.title,
            author:req.body.author
        })
        .then(book => res.status(201).send(book))
        .catch(error => res.status(400).send(error));
    },
    list(req,res){
        return Book
        .all()
        .then(books => res.status(200).send(books))
        .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Book
          .findById(req.params.bookId)
          .then(book => {
            if (!book) {
              return res.status(404).send({
                message: 'Book Not Found',
              });
            }
            return book
              .update({
                title: req.body.title || book.title,
                author:req.body.author || author.title,
              })
              .then(() => res.status(200).send(book))  
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
      destroy(req, res) {
        return Book
          .findById(req.params.bookId)
          .then(book => {
            if (!book) {
              return res.status(400).send({
                message: 'Book Not Found',
              });
            }
            return book
            .destroy()
            .then(() => res.status(200).send({ message: 'Book deleted successfully.' }))
            .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      },
}