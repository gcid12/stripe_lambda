const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// ROUTE: /customer
//AddCard.js:76


module.exports.handler = async(event, context, callback) => {
    const requestBody = JSON.parse(event.body);
    const token = requestBody.token.id;
    const email = requestBody.email;
    const description = requestBody.description;
    console.log('requestBody:', requestBody);

    return stripe.customers.create({
      source: token,
      description,
      email,
    })
    .then(customer => {
        console.log('then...');
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
        console.log('catch...');
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