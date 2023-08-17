/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const SettingsPopup = ({ currentSettings, onSave }) => {

    const [puzzleType, setPuzzleType] = useState(currentSettings.puzzleType);
    const [inputs, setInputs] = useState([]);
    
    const handleSave = () => {
        
        var inputs = []
        if (puzzleType[0] === '2') {
            inputs = [2,9];
        } else if (puzzleType[0] === '3') {
            inputs = [3,20];
        } else if (puzzleType[0] === '4') {
            inputs = [4,40];
        } else if (puzzleType[0] === '5') {
            inputs = [5,60];
        } else if (puzzleType[0] === '6') {
            inputs = [6,80];
        } else if (puzzleType[0] === '7') {
            inputs = [7,90];
        }
        
        // console.log("settings: ", { puzzleType,inputs })
        onSave({ puzzleType,inputs }); // Include other settings as needed
        
    };


    return (
        <div className='popup-container"'>
            <div className="popup-overlay" onClick={handleSave}></div>
            <div className="settings-popup">
            <button className="close-button" onClick={handleSave}>X</button>
            <h2>Settings</h2>
            <label>Select Puzzle Type:</label>
            <select value={puzzleType} onChange={(e) => setPuzzleType(e.target.value)}>
                    <option value="2x2">2x2</option>
                    <option value="3x3">3x3</option>
                    <option value="4x4">4x4</option>
                    <option value="5x5">5x5</option>
                    <option value="6x6">6x6</option>
                    <option value="5x5">5x5</option>
                    <option value="7x7">7x7</option>
                    <option value="pyraminx">Pyraminx</option>
                    <option value="megaminx">Megaminx</option>
                    <option value="skewb">Skewb</option>
                    <option value="square1">Square-1</option>
            </select>
            </div>
        </div>
    );
};

export default SettingsPopup;
