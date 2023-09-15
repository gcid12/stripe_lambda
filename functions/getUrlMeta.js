//import { got } from 'got';
const got = require('got');

// Initialize metascraper passing in the list of rules bundles to use.
const metascraper = require("metascraper")([
  
  require("metascraper-author")(),
  require("metascraper-date")(),
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-lang")(),
  require("metascraper-logo")(),
  require("metascraper-title")(),
  require("metascraper-url")(),
  require("metascraper-logo-favicon")(),
  // require("metascraper-publisher")(),
  //require("metascraper-instagram")(),
  // require("metascraper-clearbit-logo")(),
  // require("metascraper-readability")(),
  // require("metascraper-spotify")(),
  //require("metascraper-amazon")(),
  // require("metascraper-telegram")(),
  //require("metascraper-audio")(),
  // require("metascraper-soundcloud")(),
  // require("metascraper-video")(),
]);

module.exports.handler = async function(event, context, callback) {

  var targetUrl = event.queryStringParameters.url;
  console.log('targetUrl:',targetUrl)

  // Make sure the provided URL is valid.
  if (!targetUrl) {
    console.log('Please provide a valid URL.');
    return;
  }

  //THIS SIMPLE THING WORKS
  // axios.get(targetUrl)
  //   .then(res => {
    
  //     console.log(res)
  //     return res;
  //   })

  

  const { body: html, url } = await got(targetUrl);

  console.log('html:',html);
  console.log('url:',url);
  // return html;

  return await metascraper({ html, url })
  .then(results => {
    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            message: `success`,
            results
        })
    };
    callback(null, response)
    console.log(response)
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