import React, {useState} from "react";

export default function FlightForm(){
    const [data, setData] = useState("")
    const [content, setContent] = useState("")
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [selection, setSelection] = useState(false);

    const sendData = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:4000/api/headData", {
                method: "POST",
                body: JSON.stringify({ key: content }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const responseData = await response.json(); // Extracting JSON data from response
            console.log(responseData)
            setData(responseData); // Setting data state with the extracted data
            console.log(responseData); // Logging the data for verification
            //response data has one value, the final price. You can access this by doing responseData.finalCost
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    return(
        <div className="min-h-screen min-w-screen flex justify-center items-center">
            <div className="w-min h-min border-2 border-gray-400 rounded-md flex flex-col justify-center items-center">
                <form className="flex flex-col gap-3 p-3" onSubmit={sendData}>
                    <textarea value = {content} onChange={e => setContent(e.target.value)} type="text" id="depart" rows="8" cols="60" className="border-2 rounded-md px-2 text-black pt-2 items-center left-4 align-text-top resize-none" placeholder="Going to:"></textarea>
                    {console.log(content)}
                    {/* <div className="flex gap-1">
                        <input type="date" id="depart_date" name="depart_date" className="border-2 px-2 rounded-md" placeholder="Depart Date:"></input>
                        <input type="date" id="return_date" name="return_date" className="border-2 px-2 rounded-md" placeholder="Return Date:"></input>
                        <div className="h-fit">
                            <button id="passenger" type="button" className="bg-white w-[224.67px] py-2 border-2 rounded-md whitespace-nowrap" onClick={TravelerSelect}>
                                {adults > 0 ? `${adults} Adults` : "Traveler Information"}
                            </button>
                            <div id="passenger_select" className={`bg-white border-2 absolute mt-1 rounded-md z-20 px-3 w-[224.67px] ${selection ? "visible" : "invisible"}`}>
                                <div className="flex items-center gap-3 py-3 justify-between" >
                                    <h1>Adults</h1>
                                    <div className="flex gap-3 justify-center items-center">
                                        <button type="button" className="w-fit h-fit p-1 rounded-full border-2 border-black bg-white hover:bg-slate-200" onClick={DecrementAdults}><FaMinus/></button>
                                        <div>{adults}</div>
                                        <button type="button" className="w-fit h-fit p-1 rounded-full border-2 border-black bg-white hover:bg-slate-200" onClick={IncrementAdults}><FaPlus/></button>
                                    </div>
                                </div>

                                <button type="button" className="bg-cyan-500 hover:bg-cyan-600 w-full py-1 mb-2 rounded-md" onClick={TravelerSelect}>Apply</button>
                            </div>
                        </div>
                    </div> */}
                    <input type="submit" value="Submit" className="bg-cyan-500 hover:bg-cyan-600 p-2 rounded-md"/>
                </form>
                <div className={`pb-4 ${data != "" ? `visible` : `invisible`}`}>{`Total cost of the plane ticket: ${data.finalCost}`}</div>
            </div>  
        </div>
    )
}