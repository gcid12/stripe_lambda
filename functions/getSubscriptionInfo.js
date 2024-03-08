const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports.handler = async(event, context, callback) => {
    
    const requestBody = JSON.parse(event.body);
    console.log(requestBody);
    //https://docs.stripe.com/api/subscriptions/retrieve

    const result = await stripe.subscriptions.retrieve(requestBody.subscriptionId);
    console.log(result);

    if(result){
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          message: `Subscription Info Retrieved`,
          subscription: result
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