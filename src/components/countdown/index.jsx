import Countdown from 'react-countdown';

const renderer = ({days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return "";
  } else {
    // Render a countdown
    return (
      <span>
        {days}d : {hours}h : {minutes}m : {seconds}s
      </span>
    );
  }
};

const CustomCountdown = ({ startTime, endTime }) => {
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK
  const startDate = new Date(parseInt(startTime));
  const endDate = new Date(parseInt(endTime));
  const currentTime = new Date();
  if (endDate < currentTime) {
    return (
      <>
        <span style={{ paddingLeft: "24px", color: "red", fontSize: "20px" }}>
          Auction has Ended!
        </span>
      </>
    );
  }
  if (startDate > currentTime) {
    return (
      <>
        <div style={{ paddingLeft: "24px", color: "blue", fontSize: "20px" }}>
          Auction Starts in:
        </div>
        <Countdown date={startDate} renderer={renderer} />
      </>
    );
  }

  return (
    <>
      <div style={{ paddingLeft: "24px", color: "red", fontSize: "20px" }}>
        Auction ends in:
      </div>
      <Countdown date={endDate} renderer={renderer} />
    </>
  );
};

export default CustomCountdown;
