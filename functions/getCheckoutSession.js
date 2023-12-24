const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports.handler = async(event, context, callback) => {
    //https://stripe.com/docs/api/checkout/sessions/retrieve
    //https://stripe.com/docs/checkout/embedded/quickstart

    const requestBody = JSON.parse(event.body);
    console.log(requestBody);

    const session = await stripe.checkout.sessions.retrieve(requestBody.session_id);
    console.log(session);

    if(session){
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          message: `Checkout Session retrieved`,
          session
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