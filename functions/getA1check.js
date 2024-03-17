const fetch = require('node-fetch');

module.exports.handler = async(event, context, callback) => {
    
    const requestBody = JSON.parse(event.body);
    console.log(requestBody);

    console.log(requestBody.scanId);
    console.log(requestBody.text);


    //DIRECT FETCH
    return await fetch(`https://api.copyleaks.com/v2/writer-detector/${requestBody.scanId}/check`, {
        method: 'post',
        body: JSON.stringify({
            text: requestBody.text,
            //text: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
            sandbox: requestBody.sandbox
        }),
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : `Bearer ${process.env.COPYL_TOKEN}`}
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
        
    }).then(data => { 
        console.log('Data received:', data); 
        if(data){
            const response = {
              statusCode: 200,
              headers: {
                'Access-Control-Allow-Origin': '*',
              },
              body: JSON.stringify({
                message: `Score Result Ready`,
                score: data
              })
            };
            callback(null, response)
          }else{
            const response = {
              statusCode: 500,
              headers: {
                'Access-Control-Allow-Origin': '*'
              },
              body: JSON.stringify({
                error: 'Error, check Lambda Console'
              })
            };
            callback(null, response)
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