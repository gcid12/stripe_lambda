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
        const responseString = JSON.stringify(response);
        console.log("response STRING",responseString);

        if(response.status  === 200){
            //this was ok
            const { headers } = response
            console.log("headers:",headers);



            const { body } = response
            const bodyString = JSON.stringify(body);
            //console.log("body:",bodyString);


            // ungzip(bodyString).then((c)=>{
            //   console.log("DecompBody:", c);
            // })

            // RECEIVING LIKE THIS ON RESPONSE: 'content-encoding': [ 'gzip' ]
            
            response2 = {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    message: `Connected account?`,
                    data: body
                })
            };
            //callback(null, response2)
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
        
    }).then(data => { 
        console.log('Data received:', data); 
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