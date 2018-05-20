const Book = require('../models').Book;

module.exports = {
    create(req,res){
        return Book
        .create({
            title:req.body.title,
            author:req.body.author,
            email:req.body.email
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
                author:req.body.author || book.author,
                email:req.body.email || book.email
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

      contact(req, res){
        return Book
        .findById(req.params.bookId)
        .then(book => {
          if (!book){
            return res.status(400).send({
              message: 'Book not found',
            }); 
          }
          if (book.email === null){
            return res.status(400).send({
              message: 'Email not found'
            });
          }
       // })
          return book
          .update({})
          .then((book) => {
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
              to:book.email,
              from: 'vinall.banga@gmail.com',
              subject: 'General subject line',
              //text: 'No no',
              //html: req.body.content
              html:'General contentsent to the author'
            };
            sgMail.send(msg);
            res.status(200).send(`${req.body.content} content found ready to send`)
          })  
          //look at sendgrid docs ot catch unsuccessful email errors
          .catch((error) => res.status(400).send(error));
        })
      }
}