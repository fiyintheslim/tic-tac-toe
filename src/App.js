import React, {useState, useEffect, useRef} from "react";
import "./styles/index.css";

import Square from "./components/square";

function App() {
  let values=[0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [xPlayed, setXPlayed]=useState(false);
  const [xPos, addXPos]=useState([]);
  const [oPos, addOPos]=useState([]);
  const [winner, setWinner]=useState(null);
  const squares=useRef(null);

  const click=(e)=>{
    
    let val=e.target.dataset.val;
    if(!winner){
      if(xPlayed){
        e.target.textContent="O";
        addOPos([...oPos, parseInt(val)]);
        
      }else{
        e.target.textContent="X";
        let x=[...xPos, parseInt(val)]
        console.log(xPos);
        addXPos(x)
      }
      setXPlayed(!xPlayed);
    } 
    return;
  }
  const reset=()=>{
    let childr=[...squares.current.children];
    childr.forEach(a=>{
      a.textContent="";
    })
    setXPlayed(false);
    setWinner(null);
    addXPos([]);
    addOPos([]);
    
    return
  }
  useEffect(()=>{
    if(xPlayed){
      let decide=checkWinner(xPos);
      if(decide){
        setWinner("X")
      }else if(xPos.length>4){
        setWinner("No one.")
      }
    }else{
      let decide=checkWinner(oPos);
      if(decide){
        setWinner("O")
      }
    }
  }, [xPlayed])
  return (
    <>
    <div className="App">
      <div className="tic-tac-toe" ref={squares}>
      {values.map((no)=>{
        return(
        <Square click={click} key={no} value={no} />
        )
      })}
     </div>
    </div>
    {winner && 
      <div className="bottom">
        <h3>The winner is {winner}</h3>
        <span onClick={reset} className="reset">PLAY AGAIN</span>
      </div>
      }
    </>
  );
}
const checkWinner=(arg)=>{
  const comb=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for(let i=0; i<comb.length; ++i){
    console.log(i);
    if(arg.length>0){
    let isContained=comb[i].every(a=> arg.indexOf(a) >= 0);
      if(isContained){
        return true;
      }
    }
  }
}

export default App;