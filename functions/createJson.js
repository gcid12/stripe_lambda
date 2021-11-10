const AWS = require('aws-sdk');
//const S3 = new AWS.S3({region: process.env.AWS_REGION, apiVersion: '2012-10-17'});

// ROUTE: createjson/{tokenId}
// Tokenize.js:53

module.exports.handler = (event, context, callback) => {
    //const requestBody = JSON.parse(event.body);
    const data = event.body;
    console.log(data)
    const nameOfFile = event.pathParameters.tokenid;
    console.log(nameOfFile)
    //const name = requestBody.name;

    var s3 = new AWS.S3({region: 'us-west-2', apiVersion: '2012-10-17'});
    var params = {
        Bucket : "meta001",
        Key : nameOfFile + ".json",
        Body : data
    }
    console.log(params);

    s3.putObject(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log("Put to s3 should have worked: " + data);           // successful response
    });
}

