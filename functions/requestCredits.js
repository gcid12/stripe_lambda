module.exports.handler = async(event, context, callback) => {

    console.log(event);
    const requestBody = await JSON.parse(event.body);
    console.log("REQUEST-BODY:",requestBody);
    const granted = requestBody.creditsGranted || [];
    console.log("GRANTED:",granted);

    let newCredits =0;
    //todo: creditsDue needs to be defined by comparing current Date with 'credits.addedDate'. IF more than a month, update credits.
    let creditsDue = requestBody.creditsDue || false;
    let newAccount = granted[0] ? false : true;
    console.log("NEW ACCOUNT:", newAccount)

    const sendResponse=(nc, plan)=>{

      console.log(`NEW CREDITS:${nc}`)
      console.log(`PLAN:${plan}`)
      const newDate = new Date();

      const credits={
        "amount" : nc,
        "addedDate": newDate,
        "origin": `${plan}`
      };

      console.log(credits);

      // {'amount':52, 'addedDate':'123', 'origin':'monthly-creator06'}

      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          message: "Credits check ready",
          credits: credits,
          updated: newDate
        })
      };
      callback(null, response)

    }

    if(newAccount){
        //if we dont hace creditsGrantes, then this is the first time we check credits
        if(requestBody.plan === 'creator01'){
            console.log("NEW-CREATOR")
            newCredits=51;
            sendResponse(newCredits, requestBody.plan);
        }else if(requestBody.plan === 'editor01'){
            console.log("NEW-EDITOR")
            newCredits=501;
            sendResponse(newCredits, requestBody.plan);
        }

    }else if(creditsDue){
        if(requestBody.plan === 'creator01'){
            console.log("EXIST-CREATOR")
            newCredits=50;
            sendResponse(newCredits, requestBody.plan);
        }else if(requestBody.plan === 'editor01'){
            newCredits=500;
            console.log("EXIST-EDITOR")
            sendResponse(newCredits, requestBody.plan);
        }

    }else{
        console.log('No credits Due yet')
        sendResponse(0, 'test');
    }

}