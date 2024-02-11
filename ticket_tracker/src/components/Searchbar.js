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
                    <div className="flex gap-1">
                        <input type="date" id="depart_date" name="depart_date" className="border-2 px-2 rounded-md" placeholder="Depart Date:"></input>
                        <input type="date" id="return_date" name="return_date" className="border-2 px-2 rounded-md" placeholder="Return Date:"></input>
                        <div className="h-fit">
                            <button id="passenger" type="button" className="bg-white w-[224.67px] py-2 border-2 rounded-md whitespace-nowrap" onClick={TravelerSelect}>
                                {adults > 0 ? `${adults} Adults` : "Traveler Information"}
                            </button>
                            <div id="passenger_select" className={`bg-white border-2 absolute mt-1 rounded-md z-20 px-3 w-[224.67px] ${selection ? "visible" : "invisible"}`}>
                                <div className="flex items-center gap-3 py-3 justify-between" >
                                    <p1>Adults</p1>
                                    <div className="flex gap-3 justify-center items-center">
                                        <button type="button" className="w-fit h-fit p-1 rounded-full border-2 border-black bg-white hover:bg-slate-200" onClick={DecrementAdults}><FaMinus/></button>
                                        <div>{adults}</div>
                                        <button type="button" className="w-fit h-fit p-1 rounded-full border-2 border-black bg-white hover:bg-slate-200" onClick={IncrementAdults}><FaPlus/></button>
                                    </div>
                                </div>

                                <button type="button" className="bg-cyan-500 hover:bg-cyan-600 w-full py-1 mb-2 rounded-md" onClick={TravelerSelect}>Apply</button>
                            </div>
                        </div>
                    </div>
                    <input type="submit" value="Submit" className="bg-cyan-500 hover:bg-cyan-600 p-2 rounded-md"/>
                </form>
            </div>  
        </div>
    )
}