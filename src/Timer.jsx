/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import StatisticsItem from './StatsComponents/StatisticsItem';
import * as Scrambler from 'sr-scrambler'
const Timer = ({functions},settingsOpen) => {
    const [timerValue, setTimerValue] = useState(0);
    const [timerColor, setTimerColor] = useState('black');
    const [mouseDown, setMouseDown] = useState(false);
    const [spacePressed, setSpacePressed] = useState(false);

    const [prevPuzType,setPrevPuzType] = useState('3x3')
    const greenTimeoutId = useRef(null);
    const timerIntervalId = useRef(null);
    let cubeScramble = useRef(Scrambler.cube());

    function generateScramble() {
      let scrambleFunction;
      if (functions.puzzleSettings.puzzleType === 'megaminx') {
        scrambleFunction = Scrambler.megaminx;
      } else if (functions.puzzleSettings.puzzleType === 'pyraminx') {
        scrambleFunction = Scrambler.pyraminx;
      } else if (functions.puzzleSettings.puzzleType === 'skewb') {
        scrambleFunction = Scrambler.skewb;
      } else if (functions.puzzleSettings.puzzleType === 'square1') {
        scrambleFunction = Scrambler.square1;
      } else {
        scrambleFunction = Scrambler.cube;
      }
      
      if (scrambleFunction) {
        cubeScramble.current = scrambleFunction(...(functions.puzzleSettings.inputs || []));
      }
    }
    
    const [scrambleUpdated, setScrambleUpdated] = useState(0);
    useEffect(() => {
        console.log(functions.puzzleSettings.puzzleType)
        console.log("prevPuzType: ",prevPuzType)
        if (functions.puzzleSettings.puzzleType != prevPuzType)    {
          generateScramble();
          setScrambleUpdated(a => a+1);
          setPrevPuzType(functions.puzzleSettings.puzzleType);
        }   
    }, [settingsOpen, functions.puzzleSettings]);

    const startPress = () => {
        setTimerValue(0);
        setTimerColor('red');
        setMouseDown(true);
        
        greenTimeoutId.current = setTimeout(() => {
            setTimerColor('green');
        }, 250);
        
    };

    const clearPress = () => {
        clearTimeout(greenTimeoutId.current);
        clearTimeout(timerIntervalId.current);
        setMouseDown(false);
        setTimerColor('black');
    };

    const startTimer = () => {
        setTimerColor('black');
        timerIntervalId.current = setInterval(() => {
            setTimerValue((prevValue) => prevValue + 10);
        }, 10);
    };

    
    const handleMouseDown = () => {
        if (!mouseDown) {
            startPress();
        } else {
          
            clearPress();
            
            if (timerValue > 0) {
              setSpacePressed(true);
          }
        }
    };

    const handleMouseUp = () => {
        if (timerColor === 'green') {
            startTimer();
        } else {
            clearPress();
        }
    };

    const handleTouchStart = (e) => {
      e.preventDefault(); // Prevent default touch behavior
      handleMouseDown();
  };
  
  const handleTouchEnd = (e) => {
      e.preventDefault(); // Prevent default touch behavior
      handleMouseUp();
  };

    useEffect(() => {
      if (spacePressed && timerValue > 0) {
        functions.updateSolves(timerValue, cubeScramble.current);
        generateScramble();
          // cubeScramble.current = Scrambler.cube()
        setSpacePressed(false);
      }
  }, [spacePressed, functions, timerValue]);
  
    useEffect(() => {

    const handleKeyDown = (e) => {
        if (e.key === " " && !spacePressed) {
            e.preventDefault();
            handleMouseDown();
            setSpacePressed(true);
        }
    }

    const handleKeyUp = (e) => {
        if (e.key === " " && spacePressed) {
            e.preventDefault();
            handleMouseUp();
            setSpacePressed(false);
        }
    }
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const object1 = document.getElementById('the-scramble');

    if (object1) {
      object1.addEventListener('click', handleScrambleClick);
    } 

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);

      if (object1) {
        object1.removeEventListener('click', handleScrambleClick);
      }     
    }
  }, [spacePressed,timerColor]);

  const handleScrambleClick = () => {
    functions.deleteSolve(666) // delete nothing to rerender states to change the scramble
    generateScramble();
  };

    return (
        <div className='scrambleAndTimer'>
          <h1 title="Hold down the space bar to start the timer!" className='scramble' onClick={handleScrambleClick}> {cubeScramble.current}</h1>
          <div
              className={`interactive-timer ${timerColor}`}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
          >
              <StatisticsItem value={timerValue} classname={""} />
          </div>
        </div>
    );
};

export default Timer;
