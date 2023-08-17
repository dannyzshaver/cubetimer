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
            <div className="popup-container">
                <div className="popup-overlay" onClick={onClose}></div>
                <div className="popup-content">
                    <button className="close-button" onClick={onClose}>X</button>
                    <div className="popup-details">
                        <h2 className="popup-title">{statText[whichStat-3]}<StatisticsItem value={solve.time} className="times" /></h2>
                        <p className="milliseconds">({solve.time} milliseconds)</p>
                    </div>
                    <p>{statText[whichStat] + numsolves + " solves"}</p>
                </div>
            </div>
        );
};

export default MeanMedStdPopup;

