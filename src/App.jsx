/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect } from 'react';
import { Statistics } from './Statistics';
import { Timer } from './Timer';
import { TimesComponent } from "./TimesComponent";
import {Graph} from "./Graph"
import * as Scrambler from 'sr-scrambler'

import "./styles.css"

export default function App() {

  const [timerState, setTimerState] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [solves, setSolves] = useState([]);

  // TODO: Make times a list of components, like times = [ {id, time, plusTwo, DNF, scramble} ]
  // Where it's {"number", "bool", "bool", "string"}
  // Use TodoList as a guide
  // Make App, TimesComponent, Graph, and Statistics work with this change
  // Figure out how to use a scramble API, and make the scramble change on click
  // Make it so that clicking on a time (and/maybe the best, worst, best 3 of 5 and best 10 of 12) pops up a screen 
  //      with the full time, the scramble, the puzzle, and the penalties (+2 DNF) 
  // Optional: Make the graph not look weird with 0 and 1 times
  //           Add animations to when a new time gets added and deleted, and maybe to the stats table
  //           Fix the zoom so it looks good at 100% (Make everything bigger by x1.5)

  // Later: implement a settings button with enable WCA inspection, make it look good, add an info button, (make it look like ruwix)

  
    function deleteSolve(id) {
      setSolves(currentSolves => {
        return currentSolves.filter(solve => solve.id != id)
      })
    }
  

  const togglePlusTwo = (id) => {
    const updatedSolves = solves.map(solve => {
      if (solve.id === id) {
        const updatedTime = solve.plusTwo ? solve.time - 2000 : solve.time + 2000;
        return { ...solve, plusTwo: !solve.plusTwo, time: updatedTime };
      }
      return solve;
    });

    setSolves(updatedSolves);
  };

  const toggleDNF = (id) => {
    const updatedSolves = solves.map(solve =>
      solve.id === id ? { ...solve, DNF: !solve.DNF} : solve
    );
    setSolves(updatedSolves);
  };
  
  function updateSolves(time) {
    return setSolves((currentSolves) => {
      return [{id: crypto.randomUUID(), time, plusTwo: false, DNF: false}, ...currentSolves]
    }) 
  }

  // timer useeffect
  useEffect(() => {
    let interval;

    if (timerState === 3) {
      interval = setInterval(() => {
        setMilliseconds(prevMilliseconds => prevMilliseconds + 10);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [timerState]);

  // Change color useEffect
  useEffect(() => {
    if (timerState === 1) {
      const timerComponent = document.getElementById('timerItself');
      timerComponent.style.backgroundColor = 'red';
    } else if (timerState === 2) {
      const timerComponent = document.getElementById('timerItself');
      timerComponent.style.backgroundColor = 'green';
    } else {
      const timerComponent = document.getElementById('timerItself');
      timerComponent.style.backgroundColor = '#222'
    }
  }, [timerState]);

// timer logic useEffect
  useEffect(() => {

       const handleKeyDown = (event) => {
      if (event.key === ' ') {
        event.preventDefault();
        switch (timerState) {
          case 0:
            setTimerState(1);
            break;
          case 1:
            setTimerState(2)
            // setTimeout(() => setTimerState(2), 250);
            break;
          case 2:
            setTimerState(2);
            break;
          case 3:
            setTimerState(4);
            updateSolves(milliseconds);
            break;
          case 4:
            setMilliseconds(0);
            setTimerState(1);
            break;
          default:
            break;
        }
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === ' ') {
        switch (timerState) {
          case 1:
            setTimerState(0);
            break;
          case 2:
            setTimerState(3);
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [milliseconds, timerState]);

  const millisecondsToTimeObject = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const remainingMilliseconds = milliseconds % 1000;
  
    const formattedMinutes = minutes > 0 ? minutes.toString().padStart(1, '0') + ':' : '';
    const formattedSeconds = minutes > 0 ? seconds.toString().padStart(2, '0') : seconds.toString() 
    const formattedMilliseconds = remainingMilliseconds.toString().padStart(3, '0').slice(0, -1);
  
    return {
      minutes: formattedMinutes,
      seconds: formattedSeconds,
      milliseconds: formattedMilliseconds,
    };
  };


  const timeObject = millisecondsToTimeObject(milliseconds);



  // const [cubeScramble, setcubeScramble] = useState(Scrambler.cube());
  let cubeScramble ="test"
  
    if (timerState === 0 || timerState === 4) {
      cubeScramble = Scrambler.cube();
    }
    
    
  return (
    <>
      <div className="scramble">{cubeScramble}</div>

      <div className="time">
        <a title="Hold down the space bar to start the timer!">
          <Timer timeObject={timeObject}/>
        </a>
      </div>

      <div className='wrapStats'>
        <div className='solutionTimes'>
          <div className='panelTitle'>Times</div>
          <div className='panelInner'>
            <TimesComponent solves={solves} 
            m2TO={millisecondsToTimeObject} 
            deleteSolve={deleteSolve} 
            togglePlusTwo={togglePlusTwo}
            toggleDNF={toggleDNF}/>
          </div>
        </div>

        <div className='solutionStatistics'>
          <div className='panelTitle'>Stats</div>
          <div className='panelInner'>
      
              <Statistics solves = {solves} timerState={timerState} m2TO={millisecondsToTimeObject}/>
          
          </div>
        </div>


        <div className='performanceGraph'>
          <div className='panelTitle'>Graph</div>
          <Graph solves={[...solves].reverse()}/>
        </div>
      </div>
    </>
  )
}
