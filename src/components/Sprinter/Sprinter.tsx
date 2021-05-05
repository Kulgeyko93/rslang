/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import {
  isGameEnd,
  playWords,
  pushWrongAnswers,
  pushCorrectAnswers,
  setCurrentWordIndex,
  setIsGameEnd,
} from '../../features/game/gameSlice';
import { games } from '../../constants/games';
import GameHeaderSprinter from '../GameHeaderSprinter/GameHeaderSprinter';
import { createRandomArrRuWords } from '../../utils/createRandomArrRuWords';
import { createArrayEnAndRUWords } from '../../utils/createArrayEnWords';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';
import styles from './sprinter.module.scss';
import EndGame from '../EndGame/EndGame';
import GameDescriptionSprinter from '../GameDescriptionSprinter/GameDescriptionSprinter';

const gameField = {
  cursor: 'default',
  color: '#000',
  backgroundColor: '#b5ffb4',
};

const Sprinter = (): JSX.Element => {
  const gameRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const dispatch = useDispatch();

  const words = useSelector(playWords);
  const isEnd = useSelector(isGameEnd);

  const randomArrayWords: Array<string> = createRandomArrRuWords(words);
  const arrayEnWords: Array<string> = createArrayEnAndRUWords(words)[0];
  const arrayRuWords: Array<string> = createArrayEnAndRUWords(words)[1];

  const [isTrueWord, setIsTrueWord] = useState<boolean>(false);
  const [ruWorsIndex, setRuWordIndex] = useState<number>(0);
  const [enWorsIndex, setEnWordIndex] = useState<number>(0);
  const [score, setSetScore] = useState<string>('Поехали!!');
  const [answerTrueCount, setAnswerTrueCount] = useState<number>(0);
  const [disable, setDisable] = useState<boolean>(false);
  const [playSound, setPlaySound] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string>(
    'https://zvukipro.com/uploads/files/2021-02/1612332181_windows-xp-logon-sound.mp3',
  );
  const [border, setBorder] = useState(styles.borderGame);
  const [opasity, setOpasity] = useState(styles.iconNoVisible);
  const [opasityWord, setOpasityWord] = useState(true);

  const iconRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const contentRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const muteRef = useRef<boolean | null>(false);

  const stopGame = () => {
    setPlaySound(false);
    dispatch(setIsGameEnd(true));
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
    dispatch(setCurrentWordIndex());
    if (trueAnswer === answer) {
      setAudioUrl('https://zvukipro.com/uploads/files/2019-12/1575881866_22b1d8c783a14eb.mp3');
      dispatch(pushCorrectAnswers(words[ruWorsIndex]));
      setTimeout(() => {
        setDisable(false);
        setBorder(styles.borderGame);
        setOpasity(styles.iconNoVisible);
        setOpasityWord(true);
        nextWord(ruWorsIndex);
      }, 800);
      setAnswerTrueCount(answerTrueCount + 1);
      setIsTrueWord(true);
      setBorder(styles.borderTrue);
      setOpasity(styles.iconVisible);
      switch (true) {
        case answerTrueCount >= 6: {
          setSetScore('Превосходно');
          break;
        }
        case answerTrueCount >= 3 && answerTrueCount < 6: {
          setSetScore('Отлично');
          break;
        }
        default: {
          setSetScore('Не плохо');
          break;
        }
      }
      showIcon();
    } else {
      setAudioUrl('https://zvukipro.com/uploads/files/2018-10/1540309318_100-k-1-wrong-answer.mp3');
      dispatch(pushWrongAnswers(words[ruWorsIndex]));
      setTimeout(() => {
        setDisable(false);
        setBorder(styles.borderGame);
        setOpasity(styles.iconNoVisible);
        setOpasityWord(true);
        nextWord(ruWorsIndex);
      }, 800);
      setIsTrueWord(false);
      setAnswerTrueCount(0);
      setBorder(styles.borderFalse);
      setOpasity(styles.iconVisible);
      showIcon();
    }

    if (ruWorsIndex === randomArrayWords.length - 1) {
      stopGame();
    }
  };

  const handlePlaySong = (): void => {
    setPlaySound(true);
  };

  React.useEffect(() => {
    const onKeypress = (e: any) => {
      if (e.key === 'Enter') {
        compareResults(true);
        handlePlaySong();
      }
      if (e.key === ' ') {
        compareResults(false);
        handlePlaySong();
      }
    };
    document.addEventListener('keypress', onKeypress);
    return () => {
      document.removeEventListener('keypress', onKeypress);
    };
  }, [ruWorsIndex, playSound]);

  const handleMute = (mute: boolean): void => {
    muteRef.current = mute;
  };

  const isSound = React.useMemo(() => {
    if (muteRef.current === null) return false;
    handlePlaySong();
    return muteRef.current;
  }, [muteRef.current, ruWorsIndex, answerTrueCount]);

  return isEnd ? (
    <EndGame color={games[1].color} />
  ) : (
    <div ref={gameRef} className={styles.sprinter} style={gameField}>
      <div className={styles.header}>
        <GameHeaderSprinter color="none" gameRef={gameRef} isMuteSound={muteRef.current} setIsMuteSound={handleMute} />
      </div>
      <div className={`${border} ${styles.container}`}>
        <div className={styles.info}>
          <div className={styles.score}>
            <div className={styles.value}>{score}</div>
          </div>
        </div>
        <div ref={contentRef} className={styles.content}>
          <div className={`${styles.word}`}>
            <div className={styles.enWord}>{arrayEnWords[enWorsIndex]}</div>
            <div
              className={
                opasityWord ? `${styles.ruWord} ${styles.ruWordVisible}` : `${styles.ruWord} ${styles.ruWordNoVisible}`
              }
            >
              {randomArrayWords[ruWorsIndex]}
            </div>
          </div>
          <div ref={iconRef} className={`${styles.iconWord} ${opasity}`}>
            {isTrueWord ? (
              <Icon.CheckCircleFill className={styles.iconTrue} />
            ) : (
              <Icon.XCircleFill className={styles.iconFalse} />
            )}
          </div>
          <div className={styles.description}>
            <GameDescriptionSprinter />
          </div>
          <div className={styles.answerBtn}>
            <Button
              className={styles.button}
              variant="danger"
              disabled={ruWorsIndex === randomArrayWords.length || disable}
              onClick={() => {
                compareResults(false);
                handlePlaySong();
              }}
            >
              <AudioPlayer link={audioUrl} playing={playSound} format={['.mp3']} loop={false} mute={isSound} />
              Не верно
            </Button>
            <Button
              className={styles.button}
              variant="success"
              disabled={ruWorsIndex === randomArrayWords.length || disable}
              onClick={() => {
                compareResults(true);
                handlePlaySong();
              }}
            >
              Верно
            </Button>

            <Icon.FullscreenExit className={styles.buttonFullScreen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sprinter;
