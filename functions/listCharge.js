const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// ROUTE: /transfer/id
// TaskPayment.js:257
console.log('Here list charge')
module.exports.handler = (event, context, callback) => {
    const customer = event.pathParameters.id;

    return stripe.charges.list({
        customer,
    })
    .then(charges => {
        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: `Get charge list successfully`,
                charges
            })
        };
        callback(null, response)
        console.log(response)
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