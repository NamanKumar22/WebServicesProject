import axios from 'axios';
import * as dotenv from 'dotenv'

dotenv.config(); 
const getFedexAccessToken = async () => {
    const apiAddress = 'https://apis-sandbox.fedex.com/oauth/token';

    const client_id = process.env.API_KEY; 
    console.log(client_id);
    const client_secret = process.env.CLIENT_SECRET; 
    const grant_type = 'client_credentials'; 
    
    const data = {
        grant_type,
        client_id,
        client_secret,
    };
    
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    
    try {
        const response = await axios.post(apiAddress, data, { headers });
    
        if (response.status === 200) {
        
        const { access_token, token_type, expires_in, Scope } = response.data;
    
        return access_token;
        } else {
            console.error('API Request Failed with Status Code:', response.status);
            return null;
        }
    } catch (error) {
        console.error('API Request Failed:', error);
        return null;
    }
    }

    

    export default getFedexAccessToken;