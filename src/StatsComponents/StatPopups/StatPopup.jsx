/* eslint-disable react/prop-types */
import TimePopup from './TimePopup';
import MeanMedStdPopup from './MeanMedStdPopup' 
import MultiTimePopup from './MultiTimePopup';
import './StatPopups.css'
const StatPopup = ({ solve, onClose, whichStat, numsolves, solveIndex }) => {
    // console.log(whichStat, solve)
    if (whichStat < 3) {
        return <TimePopup solve={solve} onClose={onClose} whichStat={whichStat} />
    } else if (whichStat < 6) {
        return <MeanMedStdPopup solve={solve} onClose={onClose} whichStat={whichStat} numsolves={numsolves}/>
    } else {
         return <MultiTimePopup solvesContainer={solve} 
          onClose={onClose}
          whichStat={whichStat} 
          solveIndex={solveIndex}
          numsolves={numsolves} />
    }
};

export default StatPopup;

