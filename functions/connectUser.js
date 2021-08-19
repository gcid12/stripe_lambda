// ROUTE: /connectUser
//AddCard.js:76

module.exports.handler = (event, context, callback) => {
    const requestBody = JSON.parse(event.body);
    const code = requestBody.code;
    const grantType = requestBody.grantType;
    const clientSecret= process.env.STRIPE_SECRET_KEY;

    // const res = await fetch(`https://connect.stripe.com/oauth/token`, {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       clientSecret,
    //       code,
    //       grantType
    //     })
    //   });
    // const data = await res.json()
    // const response2 = {
    //     statusCode: 200,
    //     headers: {
    //         'Access-Control-Allow-Origin': '*',
    //     },
    //     body: JSON.stringify({
    //         message: `Customer connected Succesfully`,
    //         data
    //     })
    // };

    // if (data.message && data.message.includes('success')) {
    //     callback(null, response2)
    //     return data;
    // }else{
    //     return null
    // }


    return fetch(`https://connect.stripe.com/oauth/token`, {
        method: 'POST',
        body: JSON.stringify({
          clientSecret,
          code,
          grantType
        })
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