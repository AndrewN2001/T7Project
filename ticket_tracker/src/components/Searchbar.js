import React, {useState} from "react";

export default function FlightForm(){
    const [data, setData] = useState("")
    const [content, setContent] = useState("")

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
        <div className="min-h-screen min-w-screen flex flex-col justify-center items-center bg-slate-300">
            <div className="text-center pb-5">
                <h1 className="text-7xl text-gray-800">Welcome to <span className="text-cyan-500">Runaway.</span></h1>
                <h1 className="pt-4 text-xl text-gray-500">For whenever you want to hide from your wife (or husband)</h1>
            </div>

            <div className="w-min h-min rounded-sm flex flex-col justify-center items-center bg-slate-100">
                <form className="flex flex-col gap-3 p-3" onSubmit={sendData}>
                    <textarea value = {content} onChange={e => setContent(e.target.value)} type="text" id="depart" rows="8" cols="60" className="border-2 rounded-md px-2 text-black pt-2 items-center left-4 align-text-top resize-none" placeholder="Going to:"></textarea>
                    {console.log(content)}
                    <input type="submit" value="Submit" className="bg-cyan-500 hover:bg-cyan-600 p-2 rounded-md"/>
                </form>
                <div className={`pb-4 ${data != "" ? `visible` : `invisible`}`}>{`Total cost of the plane ticket: ${data.finalCost}`}</div>
            </div>  
        </div>
    )
}