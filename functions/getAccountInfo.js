const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


module.exports.handler = async(event, context, callback) => {
    //https://stripe.com/docs/connect/standard-accounts

    const requestBody = JSON.parse(event.body);
    console.log(requestBody);
    const account = requestBody.account;

    return stripe.accounts.retrieve(account)
        .then(acc => {
          const response = {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
              message: `Acc Info`,
              acc
            })
          };
          callback(null, response)
        })
        .catch(err => {
          const response = {
            statusCode: 500,
            headers: {
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
              error: err.message
            })
          };
          callback(null, response)
        })

}