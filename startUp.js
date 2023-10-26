import express from "express";
import trackPackage from '../controller/trackByOrderNumber.js'


const startUp = express.Router()

startUp.get('/',(req,res) =>{
    res.send("Checking!")
})

startUp.post('/tracking', async (req,res) => {
    const orderNum = req.body.orderNumber 

    if (!orderNum)
        return res.status(400).json({error: 'orderNumber is required'})
    else
    {
        try{
            // Replace 'your_tracking_number' with the actual tracking number you want to track.
            const trackingNumberToTrack = orderNum;
          
            const trackingInfo = await trackPackage(trackingNumberToTrack);
          
            if (trackingInfo) {
              res.send(trackingInfo)
            }
        }
        catch(err){
            console.log(err)
            res.send(err)   
        }
    }
})

export default startUp;