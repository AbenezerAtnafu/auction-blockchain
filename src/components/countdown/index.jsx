import { Statistic } from 'antd';
const { Countdown } = Statistic;

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK


const Countdown = () =>{
    <Countdown title="Countdown" value={deadline} />
}

export default Countdown;
