const axios = require('axios');
const {stringify} = require('flatted');

exports.handler =  function(event, context, callback) {

    const code = event.pathParameters.account;

    const clientSecret= process.env.STRIPE_SECRET_KEY;
    const grantType = 'authorization_code';

    let url = `https://connect.stripe.com/oauth/token`

    axios.post(url,{
        client_secret: clientSecret,
        code: code,
        grant_type: grantType
    })
    .then(res => {
    
        const result = stringify(res);
        const sui = res.data.stripe_user_id
    
        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: `success Account Linked!`,
                result,
                sui,
            })
        };
        callback(null, response)


    })
    .catch(err => {
        console.error(err)

        const response = {
            //What Network Tab will see
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            //What Console Tab will see
            body: JSON.stringify({
                error: err.message
            })
        };
        callback(null, response)
    })
}


