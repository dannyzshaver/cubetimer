/* eslint-disable react/prop-types */
import StatisticsItem from '../StatisticsItem';

const TimePopup = ({ solve, onClose, m2TO, whichStat }) => {
        const penaltiesText = solve.plusTwo || solve.DNF ? (solve.plusTwo && solve.DNF ? '+2, DNF' : (solve.DNF ? 'DNF' : '+2')) : 'None';
        const statText = [
            "",
            "Your Best Time:",
            "Your Worst Time:",
        ]
        return (
            <div className="popup-container">
                <div className="popup-overlay" onClick={onClose}></div>
                <div className="popup-content">
                    <button className="close-button" onClick={onClose}>X</button>
                    <p>{statText[whichStat]}</p>
                    <div className="popup-details">
                        <h2 className="popup-title">Time: <StatisticsItem value={solve.time} m2TO={m2TO} className="times" /></h2>
                        <p className="milliseconds">({solve.time} milliseconds)</p>
                    </div>
                    <p>Penalties: {penaltiesText}</p>
                </div>
            </div>
        );
};

export default TimePopup;

