const express = require('express');
const app = express();
const Amadeus = require('amadeus');
const nums = 6
app.get("/data", (req, res) => {
    const nums = 5
})
app.get('/api/data', (req, res) => {
    const amadeus = new Amadeus({
        clientId: 'AXkmtCwEPM2lA4RZQDZCYYXO6J9FJQ4C',
        clientSecret: 'hJHp768PNYDy3wmw'
    });
    console.log(nums)
    amadeus.shopping.flightOffersSearch.get({
        originLocationCode: 'SYD',
        destinationLocationCode: 'BKK',
        departureDate: '2024-06-01',
        adults: '2'
    }).then(function(response){
        // Send the response from Amadeus API back to the client
        res.json(response.data);
    }).catch(function(responseError){
        // Handle errors if any
        console.log(responseError.code);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.listen(4000, () =>{
    console.log("Listening on port 4000");
});
