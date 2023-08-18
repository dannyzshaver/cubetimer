/* eslint-disable react/prop-types */
import StatisticsItem from '../StatisticsItem';

const TimePopup = ({ solve, onClose,whichStat }) => {
        const penaltiesText = solve.plusTwo || solve.DNF ? (solve.plusTwo && solve.DNF ? '+2, DNF' : (solve.DNF ? 'DNF' : '+2')) : 'None';
        const statText = [
            "",
            "Your Best Time:",
            "Your Worst Time:",
        ]
        return (
            <div className="popupContainer">
                <div className="popupOverlay" onClick={onClose}></div>
                <div className="popupContent">
                    <button className="closeButton" onClick={onClose}>X</button>
                    <div className="milliseconds">{statText[whichStat]}</div>
                    <div className="popupDetails">
                        <h2 className="popupTitle">Time: <StatisticsItem value={solve.time} className="times" /></h2>
                        <p className="milliseconds">({solve.time} milliseconds)</p>
                    </div>
                    <div className='popupTimeInfo'>Scramble: {solve.scramble}</div>
                    <div className='popupTimeInfo'>Penalties: {penaltiesText}</div>
                </div>
            </div>
        );
};

export default TimePopup;

