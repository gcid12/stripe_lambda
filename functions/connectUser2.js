
const https = require('https')


console.log('connectUser2.2 here')

//NOT ASYNC
// exports.handler =  function(event, context, callback) {

    
//     const code = 'ac_K3SPpGI8CdykqzBW1T18QWlmrDqRffYG';
//     //const grantType = 'authorization_codes';

//     let url = `https://docs.aws.amazon.com/lambda/latest/dg/welcome.html#${code}`

//     https.get(url, (res) => {
//         callback(null, res.statusCode)
//         console.log('yes', event)
//         console.log('url', url)
//         console.log('res', res)

//     }).on('error', (e) => {
//         callback(Error(e))
//         console.log('nope')
//     })
// }

//THIS WORKS AND PING STRIPE EFFECTIVELY (NOT ASYNC YET)
exports.handler =  function(event, context, callback) {

    const clientSecret= process.env.STRIPE_SECRET_KEY;
    const code = 'ac_K3SPpGI8CdykqzBW1T18QWlmrDqRffYG';
    const grantType = 'authorization_codes';



    let url = `https://connect.stripe.com/oauth/token?code=${code}&client_secret=${clientSecret}&grant_type=${grantType}`

    https.get(url, (res) => {
        callback(null, res.statusCode)
        console.log('event:', event)
        console.log('url:', url)
        console.log('res:', res)

    }).on('error', (e) => {
        callback(Error(e))
        console.log('nope')
    })
}

