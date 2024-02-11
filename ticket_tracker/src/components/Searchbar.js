import React, {useState} from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

export default function FlightForm(){
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [selection, setSelection] = useState(false);

    const TravelerSelect = () => {
        setSelection(!selection);
    }

    const IncrementAdults = () => {
        if (adults < 9){
            setAdults(adults + 1);
        }
    }

    const DecrementAdults = () => {
        if (adults > 0){
            setAdults(adults - 1);
        }
    }

    return(
        <div className="min-h-screen min-w-screen flex justify-center items-center">
            <div className="w-min h-min border-2 border-gray-400 rounded-md flex justify-center items-center">
                <form className="flex flex-col gap-3 p-3">
                    <textarea type="text" id="depart" rows="8" className="border-2 rounded-md px-2 text-black pt-2 items-center left-4 align-text-top resize-none" placeholder="Going to:"></textarea>
                    <input type="submit" value="Submit" className="bg-cyan-500 hover:bg-cyan-600 p-2 rounded-md"/>
                </form>
            </div>  
        </div>
    )
}