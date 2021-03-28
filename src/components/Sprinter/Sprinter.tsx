/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import FinishGame from '../Finishgame/FinishGame';
import Progress from '../Progress/Progress';
import { createRandomArrRuWords } from '../../utils/createRandomArrRuWords';
import { createArrayEnAndRUWords } from '../../utils/createArrayEnWords';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';
import style from './sprinter.module.scss';
import { data } from './data';

const Sprinter = (): JSX.Element => {
  const randomArrayWords: Array<string> = createRandomArrRuWords(data);
  const arrayEnWords: Array<string> = createArrayEnAndRUWords(data)[0];
  const arrayRuWords: Array<string> = createArrayEnAndRUWords(data)[1];

  const [isTrueWord, setIsTrueWord] = useState(false);
  const [ruWorsIndex, setRuWordIndex] = useState<number>(0);
  const [enWorsIndex, setEnWordIndex] = useState<number>(0);
  const [score, setSetScore] = useState<number>(0);
  const [answerTrueCount, setAnswerTrueCount] = useState<number>(0);
  const [scoreMultiplier, setScoreMultiplier] = useState<number>(1);
  const [disable, setDisable] = useState<boolean>(false);
  const [playSound, setPlaySound] = useState<boolean>(false);
  const [isEndGame, setIsEndGame] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string>('https://zvukipro.com/uploads/files/2019-12/1575881866_22b1d8c783a14eb.mp3');

  const iconRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const contentRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  // const borderRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const stopGame = () => {
    setPlaySound(false);
    setIsEndGame(true);
    setIsEndGame(true);
    return false;
  };

  const nextWord = (index: number): void => {
    if (index < randomArrayWords.length) {
      setRuWordIndex(index + 1);
      setEnWordIndex(index + 1);
    }
  };

  const showIcon = (): void => {
    iconRef.current.style.opacity = '1';
    // setTimeout(() => { iconRef.current.style.opacity = '0'; }, 150);
  };

  const compareResults = (answer: boolean): void => {
    if (ruWorsIndex === randomArrayWords.length) {
      stopGame();
    }
    setDisable(true);
    const trueAnswer = arrayRuWords[ruWorsIndex] === randomArrayWords[ruWorsIndex];
    const points = 20;
    if (trueAnswer === answer) {
      setAudioUrl('https://zvukipro.com/uploads/files/2019-12/1575881866_22b1d8c783a14eb.mp3');
      setTimeout(() => setDisable(false), 800);
      setAnswerTrueCount(answerTrueCount + 1);
      setIsTrueWord(true);
      switch (true) {
        case answerTrueCount >= 6: {
          setScoreMultiplier(4);
          setSetScore(score + points * scoreMultiplier);
          break;
        }
        case answerTrueCount >= 3 && answerTrueCount < 6: {
          setScoreMultiplier(2);
          setSetScore(score + points * scoreMultiplier);
          break;
        }
        default: {
          setScoreMultiplier(1);
          setSetScore(score + points * scoreMultiplier);
          break;
        }
      }
      showIcon();
    } else {
      setAudioUrl('https://zvukipro.com/uploads/files/2018-10/1540309318_100-k-1-wrong-answer.mp3');
      setTimeout(() => setDisable(false), 800);
      setIsTrueWord(false);
      setAnswerTrueCount(0);
      setScoreMultiplier(1);
      showIcon();
    }

    if (ruWorsIndex === randomArrayWords.length - 1) {
      stopGame();
    }
  };

  const handlePlaySong = (): void => {
    setPlaySound(true);
  };

  return (
    <div className={style.sprinter}>
      <div className={style.container}>
        <div className={style.info}>
          <div className={style.score}>
            <div className={style.value}>Общий счёт: {score}</div>
            <div className={style.multipilier}>+{20 * scoreMultiplier} очков за слово</div>
          </div>
          <Progress now={30} max={30} className={style.visualTimer} stopGame={stopGame} />
        </div>
        {
          isEndGame
            ? <FinishGame score={score} />
            : (
              <div ref={contentRef} className={style.content}>
                <div className={style.pointsWords}>
                  <img src="https://miro.medium.com/max/1838/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" alt="asdasd" />
                </div>
                <div className={style.word}>
                  <div className={style.enWord}>{arrayEnWords[enWorsIndex]}</div>
                  <div className={style.ruWord}>{randomArrayWords[ruWorsIndex]}</div>
                </div>
                <div ref={iconRef} className={style.iconWord}>
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
                    disabled={ruWorsIndex === randomArrayWords.length || disable}
                    onClick={() => {
                      nextWord(ruWorsIndex);
                      compareResults(false);
                      // showIcon();
                      handlePlaySong();
                    }}
                  >
                    <AudioPlayer
                      link={audioUrl}
                      playing={playSound}
                      format={['.mp3']}
                      loop={false}
                      mute={false}
                    />
                    Не верно
                  </Button>
                  <Button
                    className={style.button}
                    variant="success"
                    disabled={ruWorsIndex === randomArrayWords.length || disable}
                    onClick={() => {
                      nextWord(ruWorsIndex);
                      compareResults(true);
                      // showIcon();
                      handlePlaySong();
                    }}
                  >
                    Верно
                  </Button>
                </div>
              </div>
            )
        }

      </div>
    </div>
  );
};

export default Sprinter;
