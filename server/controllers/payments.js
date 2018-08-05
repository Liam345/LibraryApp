const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


module.exports = {
    create(req,res){
        stripe.charges.create({
            amount: 2000,
            currency: "usd",
            description: "An example charge",
            source: req.body
          }).then(status => res.status(200).send(status))
          .catch(error => res.status(400).send(error))
    }
}