/* eslint-disable react/prop-types */
import StatisticsItem from '../StatisticsItem';


const MeanMedStdPopup = ({ solve, onClose, whichStat, numsolves }) => {
        const statText = [
            "Average: ",
            "Median: ",
            "Standard Deviation: ",
            "The average time out of ",
            "The middle time out of ",
            "The standard deviation out of "
        ]
        return (
            <div className="popupContainer">
                <div className="popupOverlay" onClick={onClose}></div>
                <div className="popupContent">
                    <button className="closeButton" onClick={onClose}>X</button>
                    <div className="popupDetails">
                        <h2 className="popupTitle">{statText[whichStat-3]}<StatisticsItem value={solve.time} className="times" /></h2>
                        <p className="milliseconds">({solve.time} milliseconds)</p>
                    </div>
                    <big>{statText[whichStat] + numsolves + " solves"}</big>
                </div>
            </div>
        );
};

export default MeanMedStdPopup;

