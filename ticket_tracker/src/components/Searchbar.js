import React from "react";

export default function FlightForm(){
    return(
        <div class="bg-gray-400">
            <form>
                <label for="fname">Departure:</label>
                <input type="text" id="departcode" name="departcode"/>
            </form>
        </div>
    )
}