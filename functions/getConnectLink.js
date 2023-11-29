const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


module.exports.handler = async(event, context, callback) => {
    //https://stripe.com/docs/connect/standard-accounts

    const requestBody = JSON.parse(event.body);
    console.log(requestBody);
    const account = requestBody.account;
    const refresh_url = requestBody.refresh_url;
    const return_url = requestBody.return_url;
    const type = requestBody.type;

    return stripe.accountLinks.create({
        account,
        refresh_url,
        return_url,
        type
      })
        .then(link => {
          const response = {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
              message: `Link Generated`,
              link
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