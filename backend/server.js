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
        res.json({finalCost: chatData.totalCost});
    } catch (error) {
        console.error('Error handling request:', error);
        // Respond with an error message
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/api/chat', async (req, res) => {
    const destination = await openAi.chat.completions.create({
        messages: [{ role: "system", content: `From this string give me only the destination, say absolutely nothing else:
        ${req.body.key}, write absolutely nothing else at all except for the destination`}],
        model: "gpt-3.5-turbo",
      });
      const source = await openAi.chat.completions.create({
        messages: [{ role: "system", content: `From this string give me only the source I'm coming from, say absolutely nothing else:
        ${req.body.key}, write absolutely nothing else at all except for the except for the source`}],
        model: "gpt-3.5-turbo",
      });

      const date = await openAi.chat.completions.create({
        messages: [{ role: "system", content: `From this string give me only the date in this format Y-MM-DD, say absolutely nothing else:
        ${req.body.key}, write absolutely nothing else at all except for the except for the date in the format Y-MM-DD`}],
        model: "gpt-3.5-turbo",
      });
      console.log(date)
      const cityCodesResponse = await fetch('http://localhost:4000/api/getCityCodes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({source: source.choices[0].message.content, destination: destination.choices[0].message.content })
        });
    const cityCodesData = await cityCodesResponse.json();
      //console.log(destination.choices[0].message.content, source.choices[0].message.content, date.choices[0].message.content);
      //console.log(cityCodesData);
      const airportData = await fetch('http://localhost:4000/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({originLocationCode: cityCodesData.sourceLocCode, destinationLocationCode: cityCodesData.destLocCode, dateDeparture: date.choices[0].message.content})
    });
    const finalData = await airportData.json()
    console.log(finalData[0].price.grandTotal)
      res.status(200).json({totalCost: finalData[0].price.grandTotal})
})

app.post('/api/getCityCodes', async (req, res) => {
    try {
        const source = req.body.source;
        const destination = req.body.destination;
        const amadeus = new Amadeus({
            clientId: 'AXkmtCwEPM2lA4RZQDZCYYXO6J9FJQ4C',
            clientSecret: 'hJHp768PNYDy3wmw'
        });
        const response = await amadeus.referenceData.locations.get({
            keyword: source,
            subType: Amadeus.location.any
        });
        console.log(response.data[0].iataCode);
        const sourceCode = response.data[0].iataCode
        const response2 = await amadeus.referenceData.locations.get({
            keyword: destination,
            subType: Amadeus.location.any
        });
        console.log(response2.data[0].iataCode);
        const destinationCode = response2.data[0].iataCode
        res.status(200).json({sourceLocCode: sourceCode, destLocCode: destinationCode})
    } catch (error) {
        console.error(error);
    }
});


app.post('/api/data', (req, res) => {
    const amadeus = new Amadeus({
        clientId: 'AXkmtCwEPM2lA4RZQDZCYYXO6J9FJQ4C',
        clientSecret: 'hJHp768PNYDy3wmw'
    });
    console.log(req.body.originLocationCode, req.body.destinationLocationCode, req.body.dateDeparture)
    amadeus.shopping.flightOffersSearch.get({
        originLocationCode: req.body.originLocationCode,
        destinationLocationCode: req.body.destinationLocationCode,
        departureDate: req.body.dateDeparture,
        adults: '1'
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
