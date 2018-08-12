const Address = require('../models').Address;

module.exports = {
  create(req, res) {
    return Address
      .create({
        addressLine: req.body.addressLine,
        city:req.body.city,
        state:req.body.state,
        zip:req.body.zip,
        country:req.body.country,
        userId:req.params.userId
      })
      .then(address => res.status(201).send(address))
      .catch(error => res.status(400).send(error));
  },
  list(req,res){
    return Address
    .all()
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send(error));
},
destroy(req,res){
    return Address
    .find({
        where:{
            id:req.params.addressId,
            userId:req.params.userId
        },
    })
    .then(address => {
        if(!address){
            return res.status(404).send({
                message:'Address not found',
            });
        }
        return address
        .destroy()
        .then(()=> res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
}
 
};