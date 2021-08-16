const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// ROUTE: /customer
//AddCard.js:76


module.exports.handler = (event, context, callback) => {
    const requestBody = JSON.parse(event.body);
    const token = requestBody.token.id;
    const email = requestBody.token.email;
    const description = requestBody.description;

    return stripe.customers.create({
      source: token,
      description,
      email,
    })
    .then(customer => {
        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: `Customer created successfully`,
                customer
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