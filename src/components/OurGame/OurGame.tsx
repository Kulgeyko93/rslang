/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Figure, Row, Col, Button } from 'react-bootstrap';
import {
  isGameEnd,
  playWord,
  playWords,
  pushWrongAnswers,
  setCurrentWord,
  setCurrentWordIndex,
  setPlayWordsArray,
  setIsGameEnd,
} from '../../features/game/gameSlice';
import { soundsVolume } from '../../features/games/gamesSlice';
import { sound } from '../../utils/sound';
import { ARROW_CODE, ENTER_CODE, games } from '../../constants/games';
import GameHeader from '../GameHeader/GameHeader';
import GameDescription from '../GameDescription/GameDescription';
import EndGame from '../EndGame/EndGame';
import PossibleAnswer from '../PossibleAnswer/PossibleAnswer';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';
import styles from './ourGame.module.scss';
import { Word } from '../../types';

const wrongSound = 'assets/sounds/wrong.mp3';

const gameField = {
  cursor: 'default',
  backgroundColor: '#a6fff5',
  minHeight: '100vh',
  margin: 0,
  paddin: 0,
};
const root = {
  padding: 0,
};

const OurGame = (): JSX.Element => {
  const gameRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const words = useSelector(playWords);
  const currentWord: Word | null = useSelector(playWord);
  const isNewGameEnd = useSelector(isGameEnd);
  const soundVolume = useSelector(soundsVolume);

  const dispatch = useDispatch();

  const [isShowAnswer, setIsShowAnswer] = React.useState(false);
  const [isNewGroupWords, setIsNewGroupWords] = React.useState(false);
  const [isFirstClick, setIsFirstClick] = React.useState(true);
  const [pressedKeyboardKey, setPressedKeyboardKey] = React.useState('');
  const [isKeyboardActive, setIsKeyboardActive] = React.useState(false);

  const textWithCurrentWord = React.useMemo(() => {
    let currentWordText: Array<string>;
    if (currentWord === undefined) {
      dispatch(setIsGameEnd(true));
      return [''];
    }
    if (currentWord !== null) {
      const currentWordWithTag = currentWord.textExample.match(/<b>[a-zA-Z]{1,}<\/b>/);
      let currentWordInOffer;
      if (currentWordWithTag !== null) {
        currentWordInOffer = currentWordWithTag[0].slice(3, currentWordWithTag.length - 5);
      }

      const currentWordTextArr = currentWord.textExample.split(`<b>${currentWordInOffer}</b>`);
      if (currentWordTextArr[0] === undefined) {
        currentWordText = [`<b>${currentWord.word}</b>`, currentWordTextArr[1]];
      } else if (currentWordTextArr[1] === undefined) {
        currentWordText = [currentWordTextArr[0], `<b>${currentWord.word}</b>`];
      } else {
        currentWordText = [currentWordTextArr[0], `<b>${currentWord.word}</b>`, currentWordTextArr[1]];
      }
    } else {
      currentWordText = [''];
    }
    return currentWordText;
  }, [currentWord]);

  const onDontKnowBtnClick = () => {
    setIsFirstClick(false);
    setIsNewGroupWords(false);
    setIsShowAnswer(true);
    sound.playSound(wrongSound, soundVolume);
    if (currentWord) {
      dispatch(pushWrongAnswers(currentWord));
    }
  };

  const onNextBtnClick = () => {
    setIsShowAnswer(false);
    dispatch(setCurrentWordIndex());
    dispatch(setCurrentWord());
    dispatch(setPlayWordsArray());
    setIsNewGroupWords(true);
    setIsFirstClick(true);
  };

  const handlerOnKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (gameRef) {
      setPressedKeyboardKey(event.key);
      if (event.key === ENTER_CODE && !isShowAnswer) {
        onDontKnowBtnClick();
      } else if (event.key === ARROW_CODE && isShowAnswer) {
        onNextBtnClick();
      }
    }
  };
  const handlerOnFocus = () => {
    setIsKeyboardActive(true);
  };
  const handlerOnBlur = () => {
    setIsKeyboardActive(false);
  };

  return (
    <Container fluid style={root}>
      <ScrollToTopOnMount />
      {!isNewGameEnd && (
        <div
          ref={gameRef}
          role="button"
          tabIndex={0}
          onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => handlerOnKeyDown(event)}
          className={styles.gameField}
          style={gameField}
          onFocus={handlerOnFocus}
          onBlur={handlerOnBlur}
        >
          <GameHeader color="none" soundVolume={soundVolume} gameRef={gameRef} isKeyboardActive={isKeyboardActive} />
          <Container fluid className={styles.container}>
            <Row className={styles.heightWordImg}>
              <div className={styles.currentWord}>
                {textWithCurrentWord.map((item, index) => {
                  if (item.includes('<b>')) {
                    return (
                      <span
                        key={index}
                        className={isShowAnswer ? styles.wordCorrectly : styles.wordNoCorrectly}
                        dangerouslySetInnerHTML={{ __html: `&nbsp;${item}&nbsp;` }}
                      />
                    );
                  }
                  return <span key={index}>{item}</span>;
                })}
              </div>
              {isShowAnswer && currentWord && (
                <Row className={styles.heightImg}>
                  <Col className={styles.right} lg={6} md={6} sm={6} xs={12}>
                    <Figure>
                      <Figure.Image
                        width="60%"
                        height="auto"
                        alt="рисунок для слова"
                        src={`${process.env.REACT_APP_BASE_URL}/${currentWord.image}`}
                      />
                    </Figure>
                  </Col>
                </Row>
              )}
            </Row>
            <Row style={{ width: '70%' }}>
              <Col className={styles.words} lg={12}>
                {words &&
                  words.map((word, index) => (
                    <PossibleAnswer
                      key={word.id}
                      currentWord={currentWord}
                      word={word}
                      index={index}
                      isShowAnswer={isShowAnswer}
                      setIsShowAnswer={setIsShowAnswer}
                      isNewGroupWords={isNewGroupWords}
                      setIsNewGroupWords={setIsNewGroupWords}
                      isFirstClick={isFirstClick}
                      setIsFirstClick={setIsFirstClick}
                      soundVolume={soundVolume}
                      pressedKeyboardKey={pressedKeyboardKey}
                      gameCheck="ourGame"
                    />
                  ))}
              </Col>
            </Row>
            <Row>
              {!isShowAnswer && (
                <Col lg={12}>
                  <Button onClick={onDontKnowBtnClick} variant="light">
                    Не знаю
                  </Button>
                </Col>
              )}
              {isShowAnswer && (
                <Col lg={12}>
                  <Button onClick={onNextBtnClick} variant="light">
                    Далее
                  </Button>
                </Col>
              )}
            </Row>
            <div className={styles.description}>
              <GameDescription gameCheck="ourGame" />
            </div>
          </Container>
        </div>
      )}
      {isNewGameEnd && <EndGame color={games[3].color} />}
    </Container>
  );
};

export default OurGame;
