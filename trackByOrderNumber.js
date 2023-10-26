import axios from 'axios';
import getFedexAccessToken from './getBearerToken.js';



let access_token = null;
async function trackPackage(trackingNumber) {
    if (!access_token) {
        access_token = await getFedexAccessToken();
        if (!access_token) {
          console.error('Access token retrieval failed.');
          return null;
        }
      }
  const apiAddress = 'https://apis-sandbox.fedex.com/track/v1/trackingnumbers';

  const headers = {
    'Content-Type': 'application/json',    
     'authorization': `Bearer ${access_token}`,
  };

  // Define the tracking information for the package.
  const trackingInfo = [
    {
      shipDateBegin: '15-08-2020', 
      shipDateEnd: '29-08-2020',  
      trackingNumberInfo: {
        trackingNumber: trackingNumber,     
        
      },
    },
  ];

  const requestBody = {
    includeDetailedScans: false, 
    trackingInfo,
  };

  try {
    const response = await axios.post(apiAddress, requestBody, { headers });

    if (response.status === 200) {
      
      const trackingData = response?.data;
//      console.log('Tracking Information:', trackingData?.completeTrackResults);
      return trackingData.output.completeTrackResults;
    } else {
      console.error('API Request Failed with Status Code:', response.status);
      return null;
    }
  } catch (error) {
    console.error('API Request Failed:', error);
    return null;
  }
}

export default trackPackage;
