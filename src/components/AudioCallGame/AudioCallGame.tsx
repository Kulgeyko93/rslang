import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Figure from 'react-bootstrap/Figure';
import volumeImg from '../../assets/icons/volume.svg';
import styles from './AudioCallGame.module.css';
import {
  isGameEnd,
  playWord,
  playWords,
  pushWrongAnswers,
  setCurrentWord,
  setCurrentWordIndex,
  setPlayWordsArray,
} from '../../features/audiocall/audiocallSlice';
import { sound } from '../../utils/sound';
import { volume } from '../../const/games';
import PossibleAnswerOfAudioCall from '../PossibleAnswerOfAudioCall/PossibleAnswerOfAudioCall';
import EndAudioCall from '../EndAudioCall/EndAudioCall';
import { soundsVolume } from '../../features/games/gamesSlice';
import GameHeader from '../GameHeader/GameHeader';

const wrongSound = 'assets/sounds/wrong.mp3';

const text = {
  color: '#000',
  fontSize: '1.1rem',
  fontWeight: 600,
};

const AudioCallGame = (): JSX.Element => {
  const words = useSelector(playWords);
  const currentWord = useSelector(playWord);
  const isAudioCallGameEnd = useSelector(isGameEnd);
  const soundVolume = useSelector(soundsVolume);

  const dispatch = useDispatch();

  const [isShowAnswer, setIsShowAnswer] = React.useState(false);
  const [isNewGame, setIsNewGame] = React.useState(false);
  const [isFirstClick, setIsFirstClick] = React.useState(true);

  React.useEffect(() => {
    if (currentWord && !isAudioCallGameEnd) {
      const soundUrl = `${process.env.REACT_APP_BASE_URL}/${currentWord.audio}`;
      sound.playSound(soundUrl, volume);
    }
  }, [currentWord]);
  const onSoundImgClick = () => {
    if (currentWord) {
      const soundUrl = `${process.env.REACT_APP_BASE_URL}/${currentWord.audio}`;
      sound.playSound(soundUrl, volume);
    }
  };

  const onDontKnowBtnClick = () => {
    setIsFirstClick(false);
    setIsNewGame(false);
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
    setIsNewGame(true);
    setIsFirstClick(true);
  };

  return (
    <>
      {!isAudioCallGameEnd && (
        <div className={styles.fullscreen}>
          <GameHeader color="yellow" soundVolume={soundVolume} />
          <Container fluid className={styles.container}>
            {!isShowAnswer && (
              <Row className={styles.height}>
                <Col lg={12} md={12} sm={12} xs={12}>
                  <Image className={styles.img} width="60" height="auto" src={volumeImg} onClick={onSoundImgClick} />
                </Col>
              </Row>
            )}
            {isShowAnswer && currentWord && (
              <Row className={styles.height}>
                <Col className={styles.left} lg={6} md={6} sm={6} xs={12}>
                  <Image className={styles.img} width="50" height="auto" src={volumeImg} onClick={onSoundImgClick} />
                </Col>
                <Col className={styles.right} lg={6} md={6} sm={6} xs={12}>
                  <Figure>
                    <Figure.Image
                      width="50%"
                      height="auto"
                      alt="рисунок для слова"
                      src={`${process.env.REACT_APP_BASE_URL}/${currentWord.image}`}
                    />
                    <Figure.Caption style={text}>{currentWord.word}</Figure.Caption>
                  </Figure>
                </Col>
              </Row>
            )}
            <Row>
              <Col className={styles.words} lg={12}>
                {words &&
                  words.map((word, index) => (
                    <PossibleAnswerOfAudioCall
                      key={word.id}
                      currentWord={currentWord}
                      word={word}
                      index={index}
                      isShowAnswer={isShowAnswer}
                      setIsShowAnswer={setIsShowAnswer}
                      isNewGame={isNewGame}
                      setIsNewGame={setIsNewGame}
                      isFirstClick={isFirstClick}
                      setIsFirstClick={setIsFirstClick}
                      soundVolume={soundVolume}
                    />
                  ))}
              </Col>
            </Row>
            <Row>
              {!isShowAnswer && (
                <Col lg={12}>
                  <Button onClick={onDontKnowBtnClick} variant="outline-dark">
                    Не знаю
                  </Button>
                </Col>
              )}
              {isShowAnswer && (
                <Col lg={12}>
                  <Button onClick={onNextBtnClick} variant="outline-dark">
                    Далее
                  </Button>
                </Col>
              )}
            </Row>
          </Container>
        </div>
      )}
      {isAudioCallGameEnd && <EndAudioCall color="yellow" />}
    </>
  );
};

export default AudioCallGame;
