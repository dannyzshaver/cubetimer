/* eslint-disable react/prop-types */
import { useState } from 'react';
import StatisticsItem from './StatisticsItem';
import StatPopup from './StatPopups/StatPopup';

export function Times({ solves, deleteSolve, togglePlusTwo, toggleDNF }) {

    const handleDelete = (id) => {
        deleteSolve(id);
    };

    const handlePlusTwo = (id) => {
        togglePlusTwo(id);
    };

    const handleDNF = (id) => {
        toggleDNF(id);
    };

    const [selectedSolve, setSelectedSolve] = useState(null);
    
    const handleTimeClick = (solve) => {
        if (selectedSolve && selectedSolve.id === solve.id) {
          setSelectedSolve(null); // Close the popup if clicking on the same solve again
        } else {
          setSelectedSolve(solve); // Open the popup for the clicked solve
        }
      };

    const handleClosePopup = () => {
        setSelectedSolve(null);
    };


    const fastestTime = Math.min(...solves.map(solve => solve.time));
    const slowestTime = Math.max(...solves.map(solve => solve.time));

return (
    <ul>
        {solves.map((solve, index) => {
            // Determine whichStat value based on solve's time
            let whichStat = 0;
            if (solve.time === fastestTime) {
                whichStat = 1; // Fastest time
            } else if (solve.time === slowestTime) {
                whichStat = 2; // Slowest time
            }

            return (
                
                <li className='lineBelow' key={solve.id}>
                    
                    <span className='timeIndexes' >{solves.length - index}:</span>
                    <a title="Click to view the full time and scramble!" className={"clickforpopup"} onClick={() => handleTimeClick(solve)}>
                        <StatisticsItem value={solve.time} className={"times"}/>
                    </a>
                    
                    {selectedSolve && selectedSolve.id === solve.id && (
                            <StatPopup solve={selectedSolve} onClose={handleClosePopup} whichStat={whichStat}/>
                        )}
                    <button className={solve.plusTwo ? 'plus2btn-active' : 'plus2btn-inactive'}
                    onClick={() => handlePlusTwo(solve.id)}>
                        +2
                    </button>

                    <button className={solve.DNF ? 'plus2btn-active' : 'plus2btn-inactive'}
                    onClick={() => handleDNF(solve.id)}>
                        DNF
                    </button>

                    <button className='delbtn' onClick={() => handleDelete(solve.id)}>x</button>
                </li>

            );
        })}
    </ul>
);
}