const Order = require('../models').Order;



module.exports = {
  create(req, res) {
    return Order
      .create({
        userId:req.params.userId,
        bookQuantity:req.body.bookQuantity,
        totalAmount:req.body.totalAmount,
        status:req.body.status,
        addressId:req.body.addressId,
        chargeId:req.body.chargeId
      })
      .then(orders => res.status(201).send(orders))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req,res){
    return Order
    .findAll({
        where:{
            //id:req.params.addressId,
            userId:req.params.userId
        },
    })
    .then(orders => {
        if(!orders){
            return res.status(404).send({
                message: 'Order Not Found',
        })
    }
    return res.status(200).send(orders);
    })
    .catch(error => res.status(400).send(error)); 
  },
  list(req,res){
    return Order
    .all()
    .then(orders => res.status(200).send(orders))
    .catch(error => res.status(400).send(error));
},
destroy(req,res){
    return Order
    .find({
        where:{
            id:req.params.orderId,
            userId:req.params.userId
        },
    })
    .then(orders => {
        if(!orders){
            return res.status(404).send({
                message:'Order not found',
            });
        }
        return orders
        .destroy()
        .then(()=> res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
}
 
};