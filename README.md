## Introduction

This documentation outlines the use of the tracking API. These the tracking API allows you to track a package using FedEx's
tracking API by using an access token required for authorization.

## Table of Contents

- [Authorization](#authorization)
- [Request Format](#request-format)
- [Responses](#responses)
- [Status Codes](#status-codes)



## Authorization
The authorization process is handled by the `getBearerToken.js` file, which retrieves an access token for your API requests. 

To obtain an access token for your API requests, you can use the `getAPIAuthorization` function from the `authorization.js` file. This function does not require any parameters and can be called as follows:



## Request Format

### Authorization API Details
The authorization API used in this code is responsible for obtaining an access token required to make
authorized requests to the FedEx tracking API.

### How to Get API Credentials

To use the authorization API, you need the following credentials:
- `API_KEY`: Your FedEx API key.
- `CLIENT_SECRET`: Your FedEx client secret.
These credentials should be kept secure in the .env file and not exposed in your codebase.

### How the Authorization API Works
The `getFedexAccessToken` function is responsible for obtaining an access token from FedEx&#39;s
authorization API. It uses the provided API key and client secret to make a POST request to the FedEx
OAuth endpoint. The response contains the access token required for authorized access to the tracking
API.

### API Authorization Examples
Here&#39;s an example of how to obtain an access token using the `getFedexAccessToken` function:

import getFedexAccessToken from &#39;./getFedexAccessToken&#39;;

async function main() {
const access_token = await getFedexAccessToken();

if (access_token) {
console.log(&#39;Access token:&#39;, access_token);
} else {
console.error(&#39;Access token retrieval failed.&#39;);
}
}

main();


### Track Package API
The `trackPackage` function  is responsible for tracking a FedEx package using the obtained access token.
It constructs the request to the tracking API, including the package&#39;s tracking number, and makes an
authorized POST request to the API endpoint.

Example of Tracking a Package
Here&#39;s an example of how to use the `trackPackage` function to track a package:

import trackPackage from &#39;./trackPackage&#39;;

async function main() {
const trackingNumber = &#39;YOUR_TRACKING_NUMBER&#39;;
const trackingData = await trackPackage(trackingNumber);
if (trackingData) {
console.log(&#39;Tracking Information:&#39;, trackingData);
} else {
console.error(&#39;Package tracking failed.&#39;);
}
}

main();
``` 

## Responses 
The response from the `trackPackage` function returns tracking information of a shipment.

## Status Codes
- **200:** The request was successful, and the response contains tracking information.
- **401:** Unauthorized. Check your API credentials and ensure you have a valid access token.
- **404:** Resource not found. The tracking number may be incorrect.
- **500:** Internal server error. 
