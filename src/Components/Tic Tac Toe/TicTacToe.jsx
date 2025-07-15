import React, { useRef, useState } from 'react'
import './TicTacToe.css'
import { assets } from '../../assets/assets'
import axios from 'axios';

let data=["","","","","","","","",""]
function TicTacToe() {
  let[count,setCount]=useState(0);
  let[lock,setLock]=useState(false)
  let titleRef=useRef(null)
  let box1=useRef(null);
  let box2=useRef(null);
  let box3=useRef(null);
  let box4=useRef(null);
  let box5=useRef(null);
  let box6=useRef(null);
  let box7=useRef(null);
  let box8=useRef(null);
  let box9=useRef(null);

  let box_array=[box1,box2,box3,box4,box5,box6,box7,box8,box9]


  let toggle=(e,num)=>{
    if(lock){
      // lock true means no more moves allowed so using return
      return 0;
   }
   if(count%2===0){
    // player x turn
    e.target.innerHTML= `<img src='${assets.cross}' alt="">`
    data[num]="x"
    setCount(++count)
   }
   else{
    // player o turn
    e.target.innerHTML= `<img src='${assets.circle}' alt="">`

    data[num]="o";
    setCount(++count)
   }
    checkWin()
  }

  const checkWin=()=>{
    if(data[0]===data[1] && data[1]===data[2] && data[2]!=""){
      won(data[2])
    }
    else if(data[3]===data[4] && data[4]===data[5] &&data[5]!=""){
      won(data[5])
    }
    else if(data[6]===data[7] && data[7]===data[8] && data[8]!=""){
      won (data[8])
    }
    else if(data[0]===data[3] && data[3]===data[6] && data[6]!=""){
      won (data[6])
    }
    else if(data[1]===data[4] && data[4]===data[7] && data[7]!=""){
      won (data[7])
    }
    else if(data[2]===data[5] && data[5]===data[8] && data[8]!=""){
      won (data[8])
    }
    else if(data[0]===data[4] && data[4]===data[8] && data[8]!=""){
      won (data[8])
    }
    else if(data[2]===data[4] && data[4]===data[6] && data[6]!=""){
      won (data[6])
    }

  }

  const won=(winner)=>{
    setLock(true)
    saveGameResult(winner,data)
    if(winner=="x"){
      titleRef.current.innerHTML=`Congratulations : <img  src=${assets.cross}> Wins`
    }
    else{
      titleRef.current.innerHTML=`Congratulations : <img src=${assets.circle}> Wins`
    }
  }
  const reset=()=>{
    setLock(false);
    data=["","","","","","","","",""]
    titleRef.current.innerHTML=`Tic Tac Toe Game`
    box_array.map((e)=>{
      e.current.innerHTML=""
    })

  }

  const saveGameResult=async(winner,data)=>{
    try{
      await axios.post("http://localhost:5003/api/save-game",{
        winner,
        data
      })
      console.log("game saved successfully")
    }catch(err){
      console.error('error in saving game',err)
    }
  }
  
  return (
    <div className='container'>
      <h2 className="title" ref={titleRef}>Tic Tac Toe Game</h2>
      <div className='board'>
        <div className='first-row'>
          <div onClick={(e)=>toggle(e,0)} ref={box1} className='boxes'></div>
          <div onClick={(e)=>toggle(e,1)} ref={box2} className='boxes'></div>
          <div onClick={(e)=>toggle(e,2)} ref={box3} className='boxes'></div>
        </div>
        <div className='second_row'>
          <div onClick={(e)=>toggle(e,3)} ref={box4} className='boxes'></div>
          <div onClick={(e)=>toggle(e,4)} ref={box5} className='boxes'></div>
          <div onClick={(e)=>toggle(e,5)} ref={box6} className='boxes'></div>
        </div>
        <div className='third_row'>
          <div onClick={(e)=>toggle(e,6)} ref={box7} className='boxes'></div>
          <div onClick={(e)=>toggle(e,7)} ref={box8} className='boxes'></div>
          <div onClick={(e)=>toggle(e,8)} ref={box9} className='boxes'></div>
        </div>

      </div>
      <button onClick={()=>reset()} className='submit'>Reset</button>
      
    </div>
  )
}

export default TicTacToe