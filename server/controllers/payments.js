const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
    async createOrRetrieveCustomer(req,res){
        try {
            //Check if customer exists in Stripe
        const existingCustomer = await stripe.customers.list({email:req.body.email});
        if(existingCustomer.data.length){
            return res.status(200).send({customerStripeId:existingCustomer.data[0].id});
        }    
        else{
            //Create a customer
        const customer = await stripe.customers.create({
            source:req.body.token,
            description:"Customer for our BookStore",
            email:req.body.email
        });
        return res.status(200).send({customerStripeId:customer.id});

        }
        }
        catch(err){
            return res.status(400).send(err);
        }    
    },

    async create(req,res){
        try
        {
        //Charge the customer instead of the Card
        const charge = await stripe.charges.create({
            amount:req.body.amount,
            currency:'aud',
            customer:req.body.customerStripeId
        },{
            idempotency_key:req.body.idemKey
        });
        return res.status(200).send(charge);
       
    }catch(err){
        return res.status(400).send(err);
    }}
    ,
    list(req,res){
    stripe.charges.list(
        { limit: 3 },
        function(err, ) {
          // asynchronously called
          if(err){
              return res.status(400).send(err)
          }
          return res.status(200).send(charges)
        }
      );
    },
    listCustomers(req,res){
        stripe.customers.list(
            { limit: 3 },
            function(err, customers) {
              // asynchronously called
              if(err){
                return res.status(400).send(err)
            }
            return res.status(200).send(customers)
            }
          );
          
    }

}