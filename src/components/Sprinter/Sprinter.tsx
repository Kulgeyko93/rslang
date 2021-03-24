import React, { useState } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import style from './sprinter.module.scss';

const Sprinter = (): JSX.Element => {
  const [isTrueWord, setIsTrueWord] = useState(false);

  return (
    <div className={style.sprinter}>
      <div className={style.container}>
        <div className={style.info}>
          <div className={style.score}>
            <div className={style.value}>3030</div>
          </div>
          <ProgressBar now={60} className={style.visualTimer} />
        </div>
        <div className={style.content}>
          <div className={style.pointsWords}>
            <img src="https://miro.medium.com/max/1838/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" alt="asdasd" />
          </div>
          <div className={style.word}>
            <div className={style.enWord}>halls</div>
            <div className={style.ruWord}>залы</div>
          </div>
          <div className={style.iconWord}>
            {
              isTrueWord
                ? <Icon.CheckCircleFill className={style.iconTrue} />
                : <Icon.XCircleFill className={style.iconFalse} />
            }
          </div>
          <div className={style.answerBtn}>
            <Button
              className={style.button}
              variant="danger"
              onClick={() => setIsTrueWord(!isTrueWord)}
            >
              Не верно
            </Button>
            <Button
              className={style.button}
              variant="success"
              onClick={() => setIsTrueWord(!isTrueWord)}
            >
              Верно
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sprinter;
