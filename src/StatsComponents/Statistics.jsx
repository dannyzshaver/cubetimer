/* eslint-disable react/prop-types */
import { useState } from 'react';
import StatisticsItem from './StatisticsItem';
import StatPopup from './StatPopups/StatPopup';
import * as math from 'mathjs';
export function Statistics({ solves }) {

  const times = solves.map(solve => solve.time);
  // Initialize the stats array with all zeros
  const stats = Array(11).fill(0);
  const statInfo = Array(11).fill(null).map((_, index) => ({
    id: index+666,
    time: 0,
    plusTwo: false,
    DNF: false,
    solves: []
  }));
  // statInfo.slice(5, 7).solves = Array(3).fill({time:0})

  

  var solveIndex = [0,0]
  if (times.length !== 0) {
    // calculate the best time
    stats[0] = math.min(times);
    statInfo[0] = solves.find(solve => solve.time === stats[0]);
    // calculate the worst time
    stats[1] = math.max(times);
    statInfo[1] = solves.find(solve => solve.time === stats[1]);
    // calculate the average time
    stats[2] = math.mean(times);
    
    // calculate the median time
    stats[3] = math.median(times);
    
    // calculate the standard deviation
    stats[4] = math.std(times) * math.sqrt((times.length - 1) / (times.length));
    

  }
  if (times.length > 4) {
    var lastFiveSolves = solves.slice(0, 5);
    // calculate the average of 5
    stats[5] = math.mean(times.slice(0, 5));
    // calculate the average of 3 of 5
    stats[6] = math.mean(times.slice(0, 5).slice().sort((a, b) => a - b).slice(1, 4));
    // calculate the best 3 of 5
    for (let i = 0; i <= times.length - 5; i++) {
      const middleThree = times.slice(i, i + 5).slice().sort((a, b) => a - b).slice(1, 4);
      const avgofthree = math.mean(middleThree);
      if (stats[7] === 0 || stats[7] > avgofthree) {
        stats[7] = avgofthree;
        var fastestThree = solves.slice(i, i + 5);
        solveIndex[0] = i;
      }
    }
    statInfo[5].solves = lastFiveSolves;
    statInfo[6].solves = lastFiveSolves;
    statInfo[7].solves = fastestThree;
  }

  if (times.length > 11) {
    var lastTwelveSolves = solves.slice(0, 12);
    // calculate the average of 12
    stats[8] = math.mean(times.slice(0,12));
    // calculate the average of 10 of 12
    stats[9] = math.mean(times.slice(0, 12).slice().sort((a, b) => a - b).slice(1, 11));
    // calculate the best 10 of 12
    for (let i = 0; i <= times.length - 12; i++) {
      const middleTen = times.slice(i, i + 12).slice().sort((a, b) => a - b).slice(1, 11);
      const avgoftwelve = math.mean(middleTen);
      if (stats[10] === 0 || stats[10] > avgoftwelve) {
        stats[10] = avgoftwelve;
        var fastestTen = solves.slice(i, i + 12);
        solveIndex[1] = i;
      }
    }
    statInfo[8].solves = lastTwelveSolves;
    statInfo[9].solves = lastTwelveSolves;
    statInfo[10].solves = fastestTen;
  }

  
  // round every value (milliseconds) to the 10s place, or to the hundreds place in seconds
  const roundedstats = stats.map(time => Math.round(time / 10) * 10);

  for (let ii = 2; ii < 11; ii++) {
    statInfo[ii].time = roundedstats[ii]
  }
    // console.log("statInfo: ",statInfo)
  const statLabels = [
    <em key="label1">Best:</em>,
    <em key="label2">Worst:</em>,
    <em key="label3">Average:</em>,
    <em key="label4">Median:</em>,
    <em key="label5">σ:</em>,
    <em key="label6">Avg 5:</em>,
    <em key="label7">3 of 5:</em>,
    <em key="label8">Best 3 of 5:</em>,
    <em key="label9">Avg 12:</em>,
    <em key="label10">10 of 12:</em>,
    <em key="label11">Best 10 of 12:</em>
  ];

  const statHoverInfo = [
    "The fastest time",
    "The slowest time",
    "The average of every time",
    "The median of the times",
    "The standard deviation of the times",
    "The average of the last 5 times",
    "The average of the last 5 times, excluding the fastest and slowest times",
    "The best average of any 5 consecutive times,\nexcluding the fastest and slowest times",
    "The average of the last 12 times",
    "The average of the last 12 times, excluding the fastest and slowest times",
    "The best average of any 12 consecutive times,\nexcluding the fastest and slowest times",
  ];

  const borderLabels = [
    "",
    "",
    "",
    "",
    "lineBelowStats",
    "",
    "",
    "lineBelowStats",
    "",
    "",
    "lineBelowStats"
  ];

  
  const [selectedSolve, setSelectedSolve] = useState({id: 0, time: 0, plusTwo: false, DNF: false});
  const handleTimeClick = (stat) => {
    if (selectedSolve && selectedSolve.id === stat.id) {
      setSelectedSolve(null); // Close the popup if clicking on the same solve again
    } else {
      setSelectedSolve(stat); // Open the popup for the clicked solve
    }
  };

    const handleClosePopup = () => {
        setSelectedSolve(null);
    };

    return (
        <ul>
          {roundedstats.map((stat, index) => (
            <li className={borderLabels[index]} key={index}>
              <div title={statHoverInfo[index]} className="statClickForPopup" onClick={() => handleTimeClick(statInfo[index])}>
                {statLabels[index]}
                <StatisticsItem value={stat} classname={""} />
              </div>
              {selectedSolve && selectedSolve.id === statInfo[index].id && (
                <StatPopup solve={statInfo[index]} 
                onClose={handleClosePopup} 
                whichStat={index+1} 
                numsolves={solves.length}
                solveIndex={solveIndex}/>
              )}
              <div className='box'></div>
            </li>
          ))}
        </ul>
    );
  }
