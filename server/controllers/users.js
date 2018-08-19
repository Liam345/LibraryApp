const User = require('../models').User;
const Address = require('../models').Address;

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
        .findAll({
            include:[{
                model:Address,
                as:'addresses'
            }]
        })
        .then(users => res.status(200).send(users))
        .catch(error => res.status(400).send(error));
    },
    retrieve(req,res){
        return User
        .findById(req.params.userId, {
            include:[{
                model:Address,
                as:'addresses'
            }],
        })
        .then(user => {
            if(!user){
                return res.status(404).send({
                    message: 'User Not Found',
            })
        }
        return res.status(200).send(user);
        })
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
    },
    update(req, res) {
        return User
          .findById(req.params.userId)
          .then(user => {
            if (!user) {
              return res.status(404).send({
                message: 'User Not Found',
              });
            }
            return user
              .update({
                firstName: req.body.firstName || user.firstName,
                lastName:req.body.lastName || user.lastName,
                stripeCustomerId:req.body.stripeCustomerId || user.stripeCustomerId
              })
              .then(() => res.status(200).send(user))  
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
}