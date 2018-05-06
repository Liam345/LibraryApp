const Book = require('../models').Book;
const Author = require('../models').Author;

module.exports = {
    create(req,res){
        return Author
        .create({
            firstname:req.body.firstname,
            lastname:req.body.lastname
        })
        .then(author => res.status(201).send(author))
        .catch(error => res.status(400).send(error));
    },
    list(req,res){
        return Author
        //.all()
        .findAll({
          include: [{
            model:Book,
            as:'books'
          }],
        })
        .then(author => res.status(200).send(author))
        .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return Author
          .findById(req.params.authorId, {
            include: [{
              model: Author,
              as: 'authors',
            }],
          })
          .then(authors => {
            if (!authors) {
              return res.status(404).send({
                message: 'Author Not Found',
              });
            }
            return res.status(200).send(book);
          })
          .catch(error => res.status(400).send(error));
      },
      update(req, res) {
        return Author
          .findById(req.params.authorId,{
            include: [{
              model: Book,
              as: 'books',
            }],
          })
          .then(author => {
            if (!author) {
              return res.status(404).send({
                message: 'Author Not Found',
              });
            }
            return author
              .update({
                firstname: req.body.firstname || author.firstname,
                lastname:req.body.lastname || author.lastname,
              })
              .then(() => res.status(200).send(author))  
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
      destroy(req, res) {
        return Author
          .findById(req.params.authorId)
          .then(author => {
            if (!author) {
              return res.status(400).send({
                message: 'Author Not Found',
              });
            }
            return author
            .destroy()
            .then(() => res.status(200).send({ message: 'Author deleted successfully.' }))
            .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      },
}