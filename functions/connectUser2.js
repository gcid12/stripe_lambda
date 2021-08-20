
const https = require('https')
const axios = require('axios')


console.log('connectUser2.8 here')

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
// exports.handler =  function(event, context, callback) {

//     const clientSecret= process.env.STRIPE_SECRET_KEY;
//     const code = 'ac_K3SPpGI8CdykqzBW1T18QWlmrDqRffYG';
//     const grantType = 'authorization_codes';



//     let url = `https://connect.stripe.com/oauth/token?code=${code}&client_secret=${clientSecret}&grant_type=${grantType}`

//     https.get(url, (res) => {
//         callback(null, res.statusCode)
//         console.log('event:', event)
//         console.log('url:', url)
//         console.log('res:', res)

//     }).on('error', (e) => {
//         callback(Error(e))
//         console.log('nope')
//     })
// }


// USING AXIOS

//Problems:
//I'm seeing its sending Data, not body as requested by Stripe
//https://github.com/axios/axios/issues/827#issuecomment-292714260

exports.handler =  function(event, context, callback) {

    const clientSecret= process.env.STRIPE_SECRET_KEY;
    const code = 'ac_K3SPpGI8CdykqzBW1T18QWlmrDqRffYG';
    const grantType = 'authorization_code';

    let url = `https://connect.stripe.com/oauth/token`

    axios.post(url,{
        client_secret: clientSecret,
        code: code,
        grant_type: grantType
    })
    .then(res => {
        console.log(`statusCode: ${res.status}`)
        console.log(res)
    })
    .catch(error => {
        console.error(error)
    })
}

// AXIOS - BUILDING THE URL
// exports.handler =  function(event, context, callback) {

//     const clientSecret= process.env.STRIPE_SECRET_KEY;
//     const code = 'ac_K3SPpGI8CdykqzBW1T18QWlmrDqRffYG';
//     const grantType = 'authorization_code';

//     let url = `https://connect.stripe.com/oauth/token?code=${code}&client_secret=${clientSecret}&grant_type=${grantType}`

// axios.post(url
//     )
//     .then(res => {
//         console.log(`statusCode: ${res.status}`)
//         console.log(res)
//     })
//     .catch(error => {
//         console.error(error)
//     })

// let url = `https://connect.stripe.com/oauth/token`;
// let data = JSON.stringify({
//     client_secret: clientSecret,
//     code: code,
//     grant_type: grantType
// })
// }

