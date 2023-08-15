/* eslint-disable react/prop-types */



export function Timer({ timeObject }) {
  
  
  return (
    <div id='timerItself' tabIndex={0}>
      <span>{timeObject.minutes}</span>
      <span>{timeObject.seconds}</span>.
      <span>{timeObject.milliseconds}</span>
    </div>
  );
}
