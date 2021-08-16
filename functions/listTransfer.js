const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports.handler = (event, context, callback) => {
  const destination = event.pathParameters.id;

  return stripe.transfers.list({
    destination,
  })
    .then(transfers => {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          message: `Get transfer list successfully`,
          transfers
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