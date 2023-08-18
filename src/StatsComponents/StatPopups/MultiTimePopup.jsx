/* eslint-disable react/prop-types */
import StatisticsItem from '../StatisticsItem';
import {Graph} from "../Graph"
const MultiTimePopup = ({ solvesContainer, onClose, whichStat, solveIndex, numsolves}) => {
    console.log('whichStat: ',whichStat)
    const statText = [
        "Avg of 5: ",
        "Avg 3 of 5: ",
        "Best 3 of 5: ",
        "Avg of 12: ",
        "Avg 10 of 12: ",
        "Best 10 of 12: ",
        "The average of the last 5 solves",
        "The average of the last 5 times, excluding the fastest and slowest times",
        "The best average of any 5 consecutive times,\nexcluding the fastest and slowest times",
        "The average of the last 12 times",
        "The average of the last 12 times, excluding the fastest and slowest times",
        "The best average of any 12 consecutive times,\nexcluding the fastest and slowest times",
    ]


        var smallestTime = {id: -1, time: -1}
        var largestTime = {id: -2,time: -1}
        var startingIndex = numsolves;
    if (whichStat !== 6 && whichStat !== 9) {
        const sortedSolves = solvesContainer.solves.slice().sort((a, b) => a.time - b.time);
        smallestTime = sortedSolves[0]?.time || 0;
        largestTime = sortedSolves[sortedSolves.length - 1]?.time || 0;
    }
    
    if (whichStat === 8) {
        startingIndex = numsolves-solveIndex[0]
    } else if (whichStat === 11) {
        startingIndex = numsolves-solveIndex[1]
    }
    

    // console.log('startingIndex: ',startingIndex)
    // console.log(numsolves-solveIndex[0])
    const SolveList = ({ solves }) => {
        return (
            <div className='statPopupTimeBox'>
                {solves.map((solve, index) => (
                    <div key={solve.id}>
                        <span className='statPopupIndexes'>{startingIndex - index}:</span>
                        <div className='statPopupTimes'>
                            <StatisticsItem value={solve.time} classname={solve.time === smallestTime || solve.time === largestTime ? 'crossed-out' : ''} />
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="popupContainer">
            <div className="popupOverlay" onClick={onClose}></div>
            <div className="popupContent">
                <button className="closeButton" onClick={onClose}>X</button>
                <div className="popupDetails">
                    <h2 className="popupTitle">{statText[whichStat - 6]}<StatisticsItem value={solvesContainer.time} className="times" /></h2>
                    <p className="milliseconds">({solvesContainer.time} milliseconds)</p>
                </div>
                <p >{statText[whichStat]}</p>
                <div className='popupDetails'>
                    <SolveList solves={solvesContainer.solves} />
                    <Graph solves={[...solvesContainer.solves].reverse()}/>
                </div>
            </div>
        </div>
    );
};

export default MultiTimePopup;

