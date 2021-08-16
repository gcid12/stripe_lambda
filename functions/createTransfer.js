const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// ROUTE: /transfer/{id}
// TaskPayment.js:257

module.exports.handler = (event, context, callback) => {
    const requestBody = JSON.parse(event.body);
    const amount = requestBody.charge.amount;
    const currency = requestBody.charge.currency;
    const transfer_group = requestBody.transfer_group;
    const destination = requestBody.destination;
  
    var chargeId =null;
    if(requestBody.charge.id){
      chargeId = requestBody.charge.id;
    }
  
    return stripe.transfers.create({
        amount,
        currency,
        transfer_group,
        destination,
        source_transaction: chargeId,
    })
    .then(transfer => {
        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: `Transfer processed successfully`,
                transfer
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