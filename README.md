
# Stripe Lambda Integration Example


### Install npm packages
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

```
serverless deploy --aws-profile <ProfileName>
serverless deploy --aws-profile default
```
