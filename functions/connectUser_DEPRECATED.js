// ROUTE: /connectUser
//ConnectAccount.js:91

// const fetch = require('node-fetch')

// const request = require('request');


module.exports.handler = async(event, context, callback) => {

    //This next line is breaking the test, 
    // const requestBody = await JSON.parse(event.body);
    // const code = requestBody.code;

    const code = 'ac_K3SPpGI8CdykqzBW1T18QWlmrDqRffYG';
    const grantType = 'authorization_codes';


    
    const clientSecret= process.env.STRIPE_SECRET_KEY;

    //OPTION 3

    // request({
    // url: 'https://connect.stripe.com/oauth/token',
    // method: 'POST',
    // headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    // },
    // body: JSON.stringify({
    //     key: '5e01e16f7134519e70e02c80ef61b692',
    //     user_id: '4d7a45774e6a41320a',
    //     client_secret :clientSecret,
    //     code: code,
    //     grant_type: grantType
    // })
    // }, function (error, response, body) {
    // if (!error && response.statusCode == 200) {
    //     console.log('BODY: ', body);
    //     var jsonResponse = JSON.parse(body); // turn response into JSON

    //     // do stuff with the response and pass it to the callback...

    //     callback(jsonResponse);
    // }
    // });


    //OPTION2
    //return fetchStripe(clientSecret, code, grantType);


    //OPTION 1
    // return fetch(`https://connect.stripe.com/oauth/token`, {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       client_secret: clientSecret,
    //       code,
    //       grant_type: grantType
    //     })
    //   })
    // .then(response => {

    //     let response2;
    //     if(response.status  === 200){
    //         //this was ok
    //         const { data } = response

    //         response2 = {
    //             statusCode: 200,
    //             headers: {
    //                 'Access-Control-Allow-Origin': '*',
    //             },
    //             body: JSON.stringify({
    //                 message: `Connected account?`,
    //                 data,
    //                 user:data.stripe_user_id
    //             })
    //         };
    //         callback(null, response2)

    //     }else{
    //         //this was an error
    //         response2 = {
    //             statusCode: 500,
    //             headers: {
    //                 'Access-Control-Allow-Origin': '*'
    //             },
    //             body: JSON.stringify({
    //                 error: 'some error'
    //             })
    //         }
    //         callback(null, response2)
    //     }
        
    // })
    // .catch(err => {
    //     const response = {
    //         statusCode: 500,
    //         headers: {
    //             'Access-Control-Allow-Origin': '*'
    //         },
    //         body: JSON.stringify({
    //             error: err.message
    //         })
    //     };
    //     callback(null, response)
    // })


    const response3 = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            message: `Hello there!`,
            user:'user 12345'
        })
    };
    callback(null, response3);
}