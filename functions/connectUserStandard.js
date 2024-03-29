const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


module.exports.handler = async(event, context, callback) => {
    //https://stripe.com/docs/connect/standard-accounts
    const requestBody = JSON.parse(event.body);
    const first = requestBody.first;
    const last = requestBody.last;
    const email = requestBody.email;
    const factusId = requestBody.factusId;

    return stripe.accounts.create({
        type: 'standard',
        metadata:{ 
            'factusId': factusId,
            'email': email,
            'first': first,
            'last': last,
        }
    }).then(acc => {
        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: `Account Created`,
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