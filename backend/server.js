require('dotenv').config();
const express = require('express');
const app = express();
const Amadeus = require('amadeus');

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
    }).then(function (response) {
        // Send the response from Amadeus API back to the client
        res.json(response.data);
    }).catch(function (responseError) {
        // Handle errors if any
        console.log(responseError.code);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.get('/api/citydata', (req, res) => {
    const amadeus = new Amadeus({
        clientId: process.env.AMADEUS_CLIENT_ID,
        clientSecret: process.env.AMADEUS_CLIENT_SECRET
    });
    const keyword = req.query.city || "Paris";
    amadeus.referenceData.location.get.citySearch({
        keyword
    })
        .then(function (response) {
            res.json(response.data)
        }).catch(function (response) {
            console.error(response);
        })
})


app.listen(4000, () => {
    console.log("Listening on port 4000");
});
