import React from "react";

const Square=({click, value, sel})=>{
    return(
        <div  onClick={click} className="square" data-val={value} >
            
        </div>
    )
}
export default Square;