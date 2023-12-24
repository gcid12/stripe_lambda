const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports.handler = async(event, context, callback) => {
    //https://stripe.com/docs/connect/collect-then-transfer-guide?payment-ui=embedded-checkout&client=react

    //This operation is only for creating a Checkout Session 
    //when recipient is not defined yet (acct Number and fees are not defined yet)
    //Todos: 
    // - Allow user to choose embed vs link
    // - Allow recipient, and fees (for direct transfers and when you know who is receiving beforehand)

    const requestBody = JSON.parse(event.body);
    console.log(requestBody);
    //Note This is a Price ID, not a price in currency$

    const payloadEmbedded = {
      mode: 'payment',
        line_items: [
          {
            price : requestBody.price,
            quantity: requestBody.quantity,
          },
        ],
        ui_mode: 'embedded',
        return_url: requestBody.return_url
    }

    const result = await stripe.checkout.sessions.create(payloadEmbedded);
    console.log(result);

    if(result){
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          message: `Checkout Link Generated`,
          link: result
        })
      };
      callback(null, response)
    }else{
      const response = {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          error: 'Error, check Lambda Console'
        })
      };
      callback(null, response)
    }

}