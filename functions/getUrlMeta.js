const { parse } = require("url");
const axios = require('axios');

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


// For an API route to work, you need to export a function as default (a.k.a request handler),
// which then receives the following parameters:
// - req: The request object.
// - res: The response object.
// See https://vercel.com/docs/serverless-functions/supported-languages#node.js for details.
module.exports.handler = async function(event, context, callback) {
  // Parse the "?url" query parameter.
  
  var targetUrl = event.pathParameters.url;
  console.log('targetUrl:',targetUrl)

  // Make sure the provided URL is valid.
  if (!targetUrl) {
    console.log('Please provide a valid URL.');
    return;
  }

  try {
    // Use the got library to fetch the website content.
    const { body: html, url } = await axios.get(targetUrl);

    const metadata = await metascraper({ html, url });
    console.log('metadata:',metadata)

    return json(metadata);

  } catch (err) {
    console.log(err);
    //res.status(401).json({ error: `Unable to scrape "${url}".` });
  }
}