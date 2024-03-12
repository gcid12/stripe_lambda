const fetch = require('node-fetch');
const {gzip, ungzip} = require('node-gzip');

module.exports.handler = async(event, context, callback) => {
    
    // const requestBody = JSON.parse(event.body);
    // console.log(requestBody);
    //https://docs.stripe.com/api/subscriptions/retrieve
    console.log("MAIL:", process.env.COPYL_MAIL);

    const result = []
    //DIRECT FETCH
    return await fetch(`https://id.copyleaks.com/v3/account/login/api`, {
        method: 'post',
        body: JSON.stringify({
          key: process.env.COPYL_KEY,
          email: process.env.COPYL_MAIL,
        }),
        headers: {'Content-Type': 'application/json'}
      })
    .then((response) => {

        let response2;
        console.log("response",response);

        if(response.status  === 200){
            //this was ok
            const { headers } = response
            console.log("headers:",headers);

            //Returning will trigger Data response
            return response.json(); 

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
        
    }).then(async data => { 
        console.log('Data received:', data); 

        let response3;
        //We have access_token
        if(data.access_token){
            //Access Token exist so we PING their API again, to check a text this time
            
            const token = `Bearer ${data.access_token}`;
            console.log("Token:",token);

            // return await fetch(`https://api.copyleaks.com/v2/writer-detector/971495/check`, {
            //     method: 'post',
            //     body: JSON.stringify({
            //         text: "text to be checked goes here",
            //         sandbox: true
            //     }),
            //     headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : data.access_token}
            // })
            // .then((response) => {
            //     console.log("response",response);
            //     //API response here
            // }).then(data =>{
            //     //Actual Response here
            //     console.log('Data received:', data);
            //     //
            //     //Sending Response Back, once we have it...
            //     response3 = {
            //         statusCode: 200,
            //         headers: {
            //             'Access-Control-Allow-Origin': '*',
            //         },
            //         body: JSON.stringify({
            //             message: `AI Score Ready...`,
            //             data: data
            //         })
            //     };
            //     callback(null, response3)
            // })

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