import React, { useEffect, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';

type PropsType = {
  now: number;
  max: number;
  className: any;
  stopGame: () => void;
};

const Progress = ({ now, max, className, stopGame }: PropsType): JSX.Element => {
  const [time, setTime] = useState<number>(now);
  const [color, setColor] = useState<string>('success');

  useEffect(() => {
    if (time >= 0) {
      setTimeout(() => setTime(time - 0.125), 125);
    }
    if (time > 10 && time <= 20) {
      setColor('warning');
    }
    if (time >= 0 && time <= 10) {
      setColor('danger');
    }
    if (time === 0) {
      stopGame();
    }
  }, [time]);

  return (
    <ProgressBar now={time} max={max} className={className} variant={color} />
  );
};

export default Progress;
