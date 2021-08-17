
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

### Deploying
```
serverless deploy --aws-profile <ProfileName>
serverless deploy --aws-profile default
```

### Using
In the AWS Lambda Console, look for:

Amazon Api Gateway -> API -> Settings -> Default EndPoint.

Looks something like:

```
https://6fnbbh45vk.execute-api.us-west-2.amazonaws.com
``
You need to add the stages, in this case 'dev'

```
https://6fnbbh45vk.execute-api.us-west-2.amazonaws.com/dev
```