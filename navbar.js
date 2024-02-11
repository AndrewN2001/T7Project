import React from "react";

export default function Navbar(){
    return(
        <div>
            <nav class="flex justify-center focus:border-blue border-8 border-solid">
                <a class="px-2 py-2 text-black hover:bg-blue-300 active:bg-blue-300">Home Page</a>
                <a class="px-2 py-2 text-black hover:bg-blue-300 active:bg-blue-300" >Search For Flights</a>
</nav>
        </div>
    )

}
