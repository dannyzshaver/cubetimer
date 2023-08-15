/* eslint-disable react/prop-types */
import TimePopup from './TimePopup';

const StatPopup = ({ solve, onClose, m2TO, whichStat }) => {
    if (whichStat < 3) {
        return (
            <TimePopup solve={solve} onClose={onClose} m2TO={m2TO} whichStat={whichStat} />
        );
    }
};

export default StatPopup;

