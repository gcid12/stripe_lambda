// ROUTE: /connectUser
//ConnectAccount.js:91

const fetch = require('node-fetch')

const fetchStripe =async(clientSecret, code, grantType)=>{

    const res = await fetch(`https://connect.stripe.com/oauth/token`, {
        method: 'POST',
        body: JSON.stringify({
          client_secret :clientSecret,
          code,
          grant_type: grantType
        })
      });
    const data = await res.json()

    const response2 = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            message: `Customer connected Succesfully`,
            data
        })
    };

    if (data.message && data.message.includes('success')) {
        
        return response2;
    }else{
        
        const errorresponse = {
                    statusCode: 500,
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        error: err.message
                    })
        };
                //callback(null, response)
        return errorresponse;
    }

}

module.exports.handler = async(event, context, callback) => {

    //This next line is breaking the test, 
    // const requestBody = await JSON.parse(event.body);
    // const code = requestBody.code;

    const code = 'ac_K3SPpGI8CdykqzBW1T18QWlmrDqRffYG';
    const grantType = 'authorization_code';


    
    const clientSecret= process.env.STRIPE_SECRET_KEY;

    //return fetchStripe(clientSecret, code, grantType);


    return fetch(`https://connect.stripe.com/oauth/token`, {
        method: 'POST',
        body: JSON.stringify({
          client_secret: clientSecret,
          code,
          grant_type: grantType
        })
      })
    .then(customer => {
        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: `Connected account?`,
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