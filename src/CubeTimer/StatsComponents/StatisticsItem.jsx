/* eslint-disable react/prop-types */

const StatisticsItem = ({ value, classname }) => {


    const millisecondsToTimeObject = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const remainingMilliseconds = milliseconds % 1000;
    
        const formattedMinutes = minutes > 0 ? minutes.toString().padStart(1, '0') + ':' : '';
        const formattedSeconds = minutes > 0 ? seconds.toString().padStart(2, '0') : seconds.toString()
        const formattedMilliseconds = remainingMilliseconds.toString().padStart(3, '0').slice(0, -1);
    
        return {
          minutes: formattedMinutes,
          seconds: formattedSeconds,
          milliseconds: formattedMilliseconds,
        };
      };
    const timeObject = millisecondsToTimeObject(value);
    return (
        <span className={classname}>
            <span>{timeObject.minutes}</span>
            <span>{timeObject.seconds}</span>.
            <span>{timeObject.milliseconds}</span>
        </span>
    );
};

export default StatisticsItem;
