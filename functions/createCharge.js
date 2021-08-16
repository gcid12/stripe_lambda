const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// ROUTE: /charge/{id} 
// Transactions.js:85 
// TaskPayment.js:148 

module.exports.handler = (event, context, callback) => {
    const requestBody = JSON.parse(event.body);
    const customer = requestBody.customer_id;
    const amount = requestBody.charge.amount;
    const description = requestBody.charge.description;
    const currency = requestBody.charge.currency;
    const transfer_group = requestBody.transfer_group;

    return stripe.charges.create({
        amount,
        currency,
        transfer_group,
        description,
        customer,
    })
    .then(charge => {
        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: `Charge processed successfully`,
                charge
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