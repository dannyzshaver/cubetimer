/* eslint-disable react/prop-types */
const SettingsPopup = ({handleInfoClose}) => {

    const infoParagraph1 = 'Use the settings buttons to change which type of puzzle you are solving, and the scramble above ' +
    'the timer will automatically update to that puzzle (The sequence of letters/numbers is in cube notation, which speedcubers ' +
    'can translate into moves on a Rubik\'s cube). Each scramble is automatically saved to its solve, so that you ' +
    'can easily see, for example, the scramble that led to your best solve.';

    const infoParagraph2 = 'Press the space button on your keyboard or click and hold the timer until it turns green; then, ' +
    'release and start solving. As soon as you solve the puzzle, press the spacebar/click the timer once again to stop the ' + 
    'timer. If necessary, add +2 or DNF penalties in accordance with WCA rules.';

    const infoParagraph3 = '"Cubing" is the official term for solving a Rubik\'s Cube, or anything similar, like a 2x2, 4x4, Pyraminx, Megaminx,' + 
    ' and any other puzzle made by Rubik\'s. In the cubing world, there are many different methods and strategies to solve these kinds of twisty puzzles' +
    ', and the term "speedcubing" is used when referring to solving a puzzle as quickly as possible.';

    return (
        <div className='popupContainer"'>
            <div className="popupOverlay" onClick={handleInfoClose}></div>
            <div className="info-popup">
            <button className="closeButton" onClick={handleInfoClose}>X</button>
            <h1>{'Rubik\'s Cube Timer Website'}</h1>
            <h2>{"I don't know anything about cubing. What is it?"}</h2>
            <p>{infoParagraph3}</p>
            <p>{'This website serves as a resource for speedcubers to practice, challenge, and improve their cubing abilities.'}</p>
            <h2>{"How do I use it?"}</h2>
            <p>{infoParagraph2}</p>
            <p>{'You can view all of your times and their scrambles, as well as their statistics in the "Times" and "Stats" tabs.'}</p>
            <h2>{'Settings and Scrambles'}</h2>
            <p>{infoParagraph1}</p>
            </div>
        </div>
    );
};

export default SettingsPopup;
