import OpenAI from 'openai';
import Express from 'express';
import Amadeus from 'amadeus';
const app = Express()
const openAi = new OpenAI()
app.get('/api/chat', async (req, res) => {
    const completion = await openAi.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "gpt-3.5-turbo",
      });
    
      console.log(completion.choices[0]);
})
app.get('/api/data', (req, res) => {
    const amadeus = new Amadeus({
        clientId: 'AXkmtCwEPM2lA4RZQDZCYYXO6J9FJQ4C',
        clientSecret: 'hJHp768PNYDy3wmw'
    });
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
