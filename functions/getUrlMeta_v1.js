const axios = require('axios');
//const S3 = new AWS.S3({region: process.env.AWS_REGION, apiVersion: '2012-10-17'});
// ROUTE: createjson/{tokenId}
// Tokenize.js:53

// var metascraper = require('metascraper')([
//   require('metascraper-author')(),
//   require('metascraper-date')(),
//   require('metascraper-description')(),
//   require('metascraper-image')(),
//   require('metascraper-logo')(),
//   require('metascraper-publisher')(),
//   require('metascraper-title')(),
//   require('metascraper-url')()
// ]);

module.exports.handler = function (event, context, callback){

  var urlToCheck = event.pathParameters.url;
  console.log('urlToCheck:',urlToCheck)

  // Check if parameter is present at all
  if (!urlToCheck) {
    throw new Error("Invalid request. url parameter missing");
  }

  var url = urlToCheck;
  if (!/^(http|https):\/\/[^ "]+$/.test(url)) {
    // Check if maybe only the http part is missing?
    url = "http://" + url;
    if (!/^(http|https):\/\/[^ "]+$/.test(url)) {
      throw new Error("Invalid request. url invalid or non-HTTP(S)");
    }
  }
  
  const getContent = async u => {
    axios.get(u)
      .then((response) => {
          if(response.status === 200) {
          const html = response.data;
          console.log('response:',response)
          return html
      }
      }, (error) => console.log(err) );
  }

  console.log('url:', url)
  return getContent(url);
  
  

    // axios.request(url)
    // //.then(Metascraper)
    // .then(res => {
    
    //   console.log(res)
    //   return res;
    // })




    //.then(Metascraper)
    // .then(({data}) => {
    //   console.log('DATA:',data)

    //   const jobs = extractListingsFromHTML(data);
    //   callback(null, {jobs});
    // })
    // .catch(callback);

    //console.log(Metascraper)
};


// module.exports.handler = function (event, context, callback) {

//   var urlToCheck = event.pathParameters.url;
//   console.log('urlToCheck:',urlToCheck)

//   // Check if parameter is present at all
//   if (!urlToCheck) {
//     throw new Error("Invalid request. url parameter missing");
//   }
//   // Check if it's a somewhat valid URL
//   var url = urlToCheck;
//   if (!/^(http|https):\/\/[^ "]+$/.test(url)) {
//     // Check if maybe only the http part is missing?
//     url = "http://" + url;
//     if (!/^(http|https):\/\/[^ "]+$/.test(url)) {
//       throw new Error("Invalid request. url invalid or non-HTTP(S)");
//     }
//   }
//   console.log("Processing request for URL", url);

//   // Actually execute the function
//   return Metascraper.scrapeUrl(url);
// };