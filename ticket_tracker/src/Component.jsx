import React, { useState, useEffect } from 'react';
const YourComponent = () => {
    useEffect(() => {
        const Amadeus = require('amadeus');
        const amadeus = new Amadeus({
        clientId: '[I7sPBBLdXnFfVcZ6Epu3Hc9aoLHAt7JR]',
        clientSecret: '[OrD1Jg3wtv35KVxK]'
      });
  
      amadeus.referenceData.urls.checkinLinks.get({
        airlineCode : 'IB'
      }).then(function(response){
        console.log(response.data);
        // Handle the API response here, e.g., set it to state
      }).catch(function(responseError){
        console.log(responseError.code);
        // Handle errors here
      });
    }, []);
}
const Component = () => {
    return(
        
        <div className = "pb-2 flex flex-col justify-center border-b-cyan-500 items-center text-6xl font-serif pt-10 text-cyan-500 bg-black" >
            <h1 className = "text-center pb-2">WanderLust</h1>
            <h1 className = "text-sm text-center">For when you wanna hide from your wife</h1>
            {YourComponent()}
        </div>
    )
}
export default Component