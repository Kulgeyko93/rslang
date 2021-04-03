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
    const interval = setTimeout(() => setTime(time - 0.125), 125);

    const timeWarning = 0.66 * now;
    const timeDanger = 0.33 * now;

    if (time > timeDanger && time <= timeWarning) {
      setColor('warning');
    }
    if (time >= 0 && time <= timeDanger) {
      setColor('danger');
    }
    if (time === 0) {
      stopGame();
    }

    return () => {
      clearTimeout(interval);
    };
  }, [time]);

  return <ProgressBar now={time} max={max} className={className} variant={color} />;
};

export default Progress;
