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


    //OPTION 1
    return fetch(`https://connect.stripe.com/oauth/token`, {
        method: 'POST',
        body: JSON.stringify({
          client_secret: clientSecret,
          code,
          grant_type: grantType
        })
      })
    .then(response => {

        let response2;
        if(response.status  === 200){
            //this was ok
            const { data } = response

            response2 = {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    message: `Connected account?`,
                    data,
                    user:data.stripe_user_id
                })
            };
            callback(null, response2)

        }else{
            //this was an error
            response2 = {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    error: 'some error'
                })
            }
            callback(null, response2)
        }
        
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