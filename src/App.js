import React, {useEffect, useState, useRef} from 'react';
// import logo from './logo.svg';
import './App.css';
import pikaPic from './pikachu.jpeg';
import pikaGif from './red.gif';
import msGif from './ms2.gif';
import dogGif from './dog.gif';
import babyGif from './baby.gif';
import gokuGif from './goku.gif';
import lazydogGif from './lazydog.gif';
import pusheenGif from './pusheen.gif';
import fartGif from './fart.gif';
import flydogGif from './flydog.gif';
import rolldogGif from './rolldog.gif';
import foxGif from './fox.gif';
import charlieDance from './charlieDance.gif';
import ad from './ad.gif';
import Sound from 'react-sound';
import song from './Hunt.mp3';
import speak from './speak.png';
// https://github.com/tensorflow/tfjs-models/tree/master/speech-commands

// 0. Import depdendencies
import * as tf from "@tensorflow/tfjs"
import * as speech from "@tensorflow-models/speech-commands"

// 4. Draw Ball
// import {drawBall} from "./utilities";

const App = () => {
const [isPlaying, setIsPlaying] = useState(false);
const [gif, setGif] = useState(pikaGif)
// 1. Create model and action states
const [model, setModel] = useState(null)
const [action, setAction] = useState(null)
const [labels, setLabels] = useState(null)
// const [one, setOne] = useState({p:msGif, c:0})

// 6. Create Canvas Ref and x,y,r
// const canvasRef = useRef(null);
const [x, setX] = useState(600)
const [y, setY] = useState(350)
// const [r, setR] = useState(10)
const [donate, setDonate] = useState(100);
const [change, setChange] = useState(0)

// 2. Create Recognizer
const loadModel = async () =>{
  const recognizer = await speech.create("BROWSER_FFT")
  console.log('Model Loaded')
  await recognizer.ensureModelLoaded();
  console.log(recognizer.wordLabels())
  setModel(recognizer)
  setLabels(recognizer.wordLabels())
}

useEffect(()=>{loadModel()}, []);

// 7. Update ball state
const numberMap = {
  "zero":pikaGif,
  // "one":one.p,
  "one":msGif,
  "two":dogGif,
  "three":gokuGif,
  "four":lazydogGif,
  "five":pusheenGif,
  "six":flydogGif,
  "seven":rolldogGif,
  "eight":foxGif,
  "nine":fartGif,
}

useEffect(()=>{
  // Update position x,y
  const update = action === 'up' ? setY(y-100) : action==="down" ? setY(y+100) : action==="left" ? setX(x-100) : action==="right"? setX(x+100) : ''
  //action==="go" ? setIsPlaying(true) : action==="stop" ? setIsPlaying(false) : ''
  // Update size r
  if(Object.keys(numberMap).includes(action)){
    // setR(10*numberMap[action])
    // setGif({p: numberMap[action]})
    setGif(numberMap[action])
  }
  if (action==="go") {
    setIsPlaying(true)
  }
  if (action==="stop") {
    setIsPlaying(false)
  }

  // canvasRef.current.width = 600;
  // canvasRef.current.height = 600;
  // const ctx = canvasRef.current.getContext('2d')
  // let canvas = document.getElementById('canvas');
  // const ctx = canvas.getContext('2d')
  // console.log(x,y,r)
  // drawBall(ctx,x,y,r)

  // const image = new Image();
  // image.src = './pikachu.jpeg';
  // image.onload = () => {
  //   ctx.drawImage(image, x, y);
  // };

  // setAction('base')

}, [action])

// 3. Listen for Actions
function argMax(arr){
  return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

const recognizeCommands = async () =>{
  console.log('Listening for commands')
  model.listen(result=>{
    // console.log(labels[argMax(Object.values(result.scores))])
    setAction(labels[argMax(Object.values(result.scores))])

  }, {includeSpectrogram:true, probabilityThreshold:0.9})
  // setTimeout(()=>model.stopListening(), 10e3)
}

  const handleChange = () => {

  }

  return (
    <div className="App">
      <header className="App-header">
      {/* <h1>Speak</h1>
      <h2>Find your Voice</h2> */}
      <img src={speak} alt=''/>
      {/* <img src={ad} alt='' style = {{
        position: 'absolute',
        top: '50px',
        right:'25px',
        height: '200px',
        width: '150px',
      }}/> */}
      <button onClick={recognizeCommands}>Command</button>
          {action ? <div>{action}</div>:<div>No Action Detected</div> }
      <img src={gif} alt='' width='250' height='200'
        style={{
          position: "absolute",
          left: `${x}px`,
          top: `${y}px`,
        }}
      />
      <div style={{
        position: 'absolute',
        left: '125px',
      }
      }>
        <div className='CL'>Command List</div>
        <div>#0-9 --> Image</div>
        <div>Direction --> Move</div>
        <div>Go/Stop --> Music</div>
      </div>

        {/* 5. Setup Canvas */}
        <canvas id='canvas'
        // ref={canvasRef}
        style={{
          // backgroundColor: 'red',
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 465,
          height: 465,
        }}
        />
        {/* <div>
          <div>one : {one.c}</div>
          <div></div>
        </div> */}
        <div className='miss' >Our mission is to help those that have lost their voice. Whether you are technologically challenged, visually impaired, or just looking to simplify things, we are here to increase your quality of life through voice recognition and control. </div>
      <div className='suffer'>Don't Suffer in Silence</div>
      < img src={charlieDance} alt='' width='90' height='150'
      />
      <button onClick={()=>{setIsPlaying(!isPlaying)}}>{!isPlaying ? 'Play Music' : 'Stop Music'}</button>
      <Sound
        url={song}
        playStatus={
          isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED
        }
      />
      <div>
         <form onSubmit={(e) => {
        e.preventDefault();
        setDonate(Number(donate) + Number(change));
        window.prompt('Thank you for your generous donation!', 'I will donate more later on');
        }}>
        <label>How much money would you like to donate?</label>
        <input value={change} onChange={(e)=>{setChange(e.target.value)}}>
      </input>
      <button type='submit'>Donate</button>
      </form>
      <div>Raised so far: ${donate}</div>
      </div>

      {/* <img src={pikaPic} alt=''
      /> */}
      {/* <img src={msGif} alt=''/> */}
      {/* <div>Pikachu: Send Help D:</div> */}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}

      </header>
    </div>
  );
}

export default App;
