// Reference: https://docs.amplify.aws/guides/functions/appsync-operations-to-lambda-layer/q/platform/js/#set-up-your-layer

// amplify/backend/function/appsyncOperations/opt/appSyncRequest.js
const https = require("https");
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const region = process.env.REGION;

/**
 *
 * @param {Object} queryDetails the query, operationName, and variables
 * @param {String} appsyncUrl url of your AppSync API
 * @param {String} apiKey the api key to include in headers. if null, will sign with SigV4
 */
exports.request = (queryDetails, appsyncUrl, apiKey) => {
  const req = new AWS.HttpRequest(appsyncUrl, region);
  const endpoint = new urlParse(appsyncUrl).hostname.toString();

  req.method = "POST";
  req.path = "/graphql";
  req.headers.host = endpoint;
  req.headers["Content-Type"] = "application/json";
  req.body = JSON.stringify(queryDetails);

  if (apiKey) {
    req.headers["x-api-key"] = apiKey;
  } else {
    const signer = new AWS.Signers.V4(req, "appsync", true);
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());
  }

  return new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...req, host: endpoint }, (response) => { 
      // Fix for https's limitation on chunks of data: https://github.com/aws-amplify/amplify-js/issues/7883 
      let data = ""; 
      response.on('data', (chunk) => { data += chunk; });
      response.on('end', () => { 
        const body = JSON.parse(data); 
        console.log(body);
        resolve(body) 
      }); 
    });

    httpRequest.write(req.body);
    httpRequest.end();
  });
};
