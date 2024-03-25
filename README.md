
# Stripe Lambda Integration Example


### Installing in Local
```bash
$ npm install
```


Install Serverless CLI first

```
npm install -g serverless
```

Then use an existing AWS Profile in your computer to authorize Serverless to push things to Lambda

Locate your profile name located at `~/.aws/credentials`

The add it to Serverless


### Deploying to different Stages:
```
serverless deploy --stage test --aws-profile default 

//https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/applications/S100-aws-node-stripe-test

serverless deploy --stage live --aws-profile default 
```

### Using
In the AWS Lambda Console, look for:

Amazon Api Gateway -> API -> Settings -> Default EndPoint.

Looks something like:

```
https://12345.execute-api.us-west-2.amazonaws.com
``
You need to add the stages, in this case 'dev'

```
https://12345.execute-api.us-west-2.amazonaws.com/dev
```

### TROUBLESHOOTING

In AWS be sure:
- Stripe SecretKeys are installed as ENV variables,  
  - AWS Console -> Lambda -> Functions -> s100....createCharge -> Configuration -> Environmental Variables.
  - this tokens are used here as:" `process.env.STRIPE_SECRET_KEYS`
- API key Required = false


- When Deploying changes, be sure you are using a current Node version (here in your computer) Node 14?
- Before Deploying and specially if its a new 

-If Cloudfront fails, be sure your NodeJS versions are supported , Apparently they keep working if it was deployed when it was still supported (Node12), but when you push changes it fails if you are not current.
  - Also check that your serverless.yml has the right node version.

  - Sometimes Lambda wipes out the ENG Variables and you need to add them again to each active Lambda Function.