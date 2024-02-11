import OpenAI from 'openai';
import Express from 'express';
import Amadeus from 'amadeus';
import Bodyparser from "body-parser"
import cors from "cors"
const app = Express()
app.use(cors())
app.use(Bodyparser.urlencoded({
    extended: true,
  }))
app.use(Bodyparser.json());
const openAi = new OpenAI()
app.post('/api/headData', async (req, res) => {
    try {
        // Access the 'key' property from the request body
        console.log(req.body.key);

        // Fetch data from /api/chat endpoint with a request body
        const chatResponse = await fetch('http://localhost:4000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({key: req.body.key})
        }); // Assuming your server is running on localhost:4000
        const chatData = await chatResponse.json();

        // Perform any necessary operations with the received data from /api/chat
        console.log(chatData);

        // Respond with a success message
        res.json({ success: true });
    } catch (error) {
        console.error('Error handling request:', error);
        // Respond with an error message
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/api/chat', async (req, res) => {
    const completion = await openAi.chat.completions.create({
        messages: [{ role: "system", content: `From this string give me only the destination, say absolutely nothing else:
        ${req.body.key}, write absolutely nothing else at all except for the destination`}],
        model: "gpt-3.5-turbo",
      });
    
      console.log(completion.choices[0].message.content);
      res.status(200).json({success:true})
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
