/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react';
import { Statistics } from './StatsComponents/Statistics';
import Timer from './Timer';
import SettingsPopup from './SettingsPopup';
import { Times } from "./StatsComponents/Times";
import { Graph } from "./StatsComponents/Graph"


import "./styles.css"

export default function App() {

  const [solves, setSolves] = useState([]);

// TODO:
  // Make the graph not look weird with 0 and 1 times
  // Add animations everywhere
  // Fix the zoom so it looks good at 100% (Make everything bigger by x1.5)
  // Implement a settings button with enable WCA inspection, make it look good, add an info button
  // Organize CSS

  function deleteSolve(id) {
    setSolves(currentSolves => {
      return currentSolves.filter(solve => solve.id != id)
    })
  }

  function deleteAllSolves() {
    setSolves([]);
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
      solve.id === id ? { ...solve, DNF: !solve.DNF } : solve
    );
    setSolves(updatedSolves);
  };

  function updateSolves(time, scramble) {
    return setSolves((currentSolves) => {
      return [{ id: crypto.randomUUID(), time, scramble, plusTwo: false, DNF: false }, ...currentSolves]
    })
  }

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [puzzleSettings, setPuzzleSettings] = useState({
    puzzleType: '3x3',
    inputs: [3,20] // Default values for cube scramble
  });
  
  const handleSettingsSave = (newSettings) => {
    setPuzzleSettings(newSettings);
    setSettingsOpen(false);
  };
  
  return (

    <div className="app">


      <button className="settings-button" onClick={() => setSettingsOpen(true)}>
        Settings
      </button>
      {settingsOpen && (
        <>
          <div className="popup-overlay" onClick={handleSettingsSave} />
          <SettingsPopup
            currentSettings={puzzleSettings}
            onSave={handleSettingsSave}
          />
        </>
      )}

      <a title="Hold down the space bar to start the timer!">
        <Timer functions={{ updateSolves, deleteSolve, puzzleSettings}}
          settingsOpen={settingsOpen}
        />
      </a>

      <div className='wrapStats'>
        <div className='solutionTimes'>
          <div className='panelTitle'>Times</div>
          <div className='panelInner'>
            <Times className="allTimes"
              solves={solves}
              deleteSolve={deleteSolve}
              deleteAllSolves={deleteAllSolves}
              togglePlusTwo={togglePlusTwo}
              toggleDNF={toggleDNF} />
              <div className='flex-container'>
            <button className='deleteAll' onClick={deleteAllSolves}>Delete All</button>
            </div>
          </div>

        </div>

        <div className='solutionStatistics'>
          <div className='panelTitle'>Stats</div>
          <div className='panelInner'>
            <Statistics solves={solves} />
          </div>
        </div>


        <div className='performanceGraph'>
          <div className='panelTitle'>Graph</div>
          <Graph solves={[...solves].reverse()} location={1} />
        </div>
      </div>
    </div>
  )
}
