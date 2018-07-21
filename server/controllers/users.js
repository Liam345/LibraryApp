const User = require('../models').User;

module.exports = {
    create(req,res){
        return User
        .create({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
    },
    list(req,res){
        return User
        .all()
        .then(users => res.status(200).send(users))
        .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
      return User
        .findById(req.params.userId)
        .then(user => {
          if (!user) {
            return res.status(400).send({
              message: 'User Not Found',
            });
          }
          return user
          .destroy()
          .then(() => res.status(200).send({ message: 'User deleted successfully.' }))
          .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
}