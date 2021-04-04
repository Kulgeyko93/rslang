/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import {
  playWords,
  pushWrongAnswers,
  pushCorrectAnswers,
  setCurrentWordIndex,
} from '../../features/game/gameSlice';
import Progress from '../Progress/Progress';
import { games } from '../../const/games';
import GameHeaderSprinter from '../GameHeaderSprinter/GameHeaderSprinter';
import { createRandomArrRuWords } from '../../utils/createRandomArrRuWords';
import { createArrayEnAndRUWords } from '../../utils/createArrayEnWords';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';
import style from './sprinter.module.scss';
import EndGame from '../EndGame/EndGame';

const Sprinter = (): JSX.Element => {
  const gameRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const dispatch = useDispatch();

  const words = useSelector(playWords);

  const randomArrayWords: Array<string> = createRandomArrRuWords(words);
  const arrayEnWords: Array<string> = createArrayEnAndRUWords(words)[0];
  const arrayRuWords: Array<string> = createArrayEnAndRUWords(words)[1];

  const [isTrueWord, setIsTrueWord] = useState<boolean>(false);
  const [ruWorsIndex, setRuWordIndex] = useState<number>(0);
  const [enWorsIndex, setEnWordIndex] = useState<number>(0);
  const [score, setSetScore] = useState<number>(0);
  const [answerTrueCount, setAnswerTrueCount] = useState<number>(0);
  const [scoreMultiplier, setScoreMultiplier] = useState<number>(1);
  const [disable, setDisable] = useState<boolean>(false);
  const [playSound, setPlaySound] = useState<boolean>(false);
  const [isEndGame, setIsEndGame] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string>('https://zvukipro.com/uploads/files/2019-12/1575881866_22b1d8c783a14eb.mp3');
  const [border, setBorder] = useState(style.borderGame);
  const [opasity, setOpasity] = useState(style.iconNoVisible);
  const [opasityWord, setOpasityWord] = useState(true);

  const iconRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const contentRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const stopGame = () => {
    setPlaySound(false);
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
  };

  const compareResults = (answer: boolean): void => {
    if (ruWorsIndex === randomArrayWords.length) {
      stopGame();
    }
    setDisable(true);
    setOpasityWord(false);
    const trueAnswer = arrayRuWords[ruWorsIndex] === randomArrayWords[ruWorsIndex];
    const points = 20;
    dispatch(setCurrentWordIndex());
    if (trueAnswer === answer) {
      setAudioUrl('https://zvukipro.com/uploads/files/2019-12/1575881866_22b1d8c783a14eb.mp3');
      dispatch(pushCorrectAnswers(words[ruWorsIndex]));
      setTimeout(() => {
        setDisable(false);
        setBorder(style.borderGame);
        setOpasity(style.iconNoVisible);
        setOpasityWord(true);
        nextWord(ruWorsIndex);
      }, 800);
      setAnswerTrueCount(answerTrueCount + 1);
      setIsTrueWord(true);
      setBorder(style.borderTrue);
      setOpasity(style.iconVisible);
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
      dispatch(pushWrongAnswers(words[ruWorsIndex]));
      setTimeout(() => {
        setDisable(false);
        setBorder(style.borderGame);
        setOpasity(style.iconNoVisible);
        setOpasityWord(true);
        nextWord(ruWorsIndex);
      }, 800);
      setIsTrueWord(false);
      setAnswerTrueCount(0);
      setScoreMultiplier(1);
      setBorder(style.borderFalse);
      setOpasity(style.iconVisible);
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
    isEndGame
      ? <EndGame color={games[1].color} />
      : (
        <div ref={gameRef} className={style.sprinter}>
          <div className={style.header}>
            <GameHeaderSprinter color={games[0].color} gameRef={gameRef} />
          </div>
          <div className={`${border} ${style.container}`}>
            <div className={style.info}>
              <div className={style.score}>
                <div className={style.value}>Общий счёт: {score}</div>
                <div className={style.multipilier}>+{20 * scoreMultiplier} очков за слово</div>
              </div>
              <Progress now={45} max={45} className={style.visualTimer} stopGame={stopGame} />
            </div>
            <div ref={contentRef} className={style.content}>
              <div className={`${style.word}`}>
                <div className={style.enWord}>{arrayEnWords[enWorsIndex]}</div>
                <div className={opasityWord ? `${style.ruWord} ${style.ruWordVisible}` : `${style.ruWord} ${style.ruWordNoVisible}`}>{randomArrayWords[ruWorsIndex]}</div>
              </div>
              <div ref={iconRef} className={`${style.iconWord} ${opasity}`}>
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
                    compareResults(false);
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
                    compareResults(true);
                    handlePlaySong();
                  }}
                >
                  Верно
                </Button>

                <Icon.FullscreenExit
                  className={style.buttonFullScreen}
                />
              </div>
            </div>

          </div>
        </div>
      )

  );
};

export default Sprinter;
