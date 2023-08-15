/* eslint-disable react/prop-types */

const StatisticsItem = ({ value, m2TO, classname }) => {

    const timeObject = m2TO(value);

    return (
        <span className={classname}>
            <span>{timeObject.minutes}</span>
            <span>{timeObject.seconds}</span>.
            <span>{timeObject.milliseconds}</span>
        </span>
    );
};

export default StatisticsItem;
