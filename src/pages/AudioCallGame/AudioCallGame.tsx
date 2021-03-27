import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Figure from 'react-bootstrap/Figure';
import GameHeader from '../../components/GameHeader/GameHeader';
import volumeImg from '../../assets/icons/volume.svg';
import styles from './AudioCallGame.module.css';
import { playWord, playWords, pushWrongAnswers } from '../../features/audioCall/audioCallSlice';
import { sound } from '../../utils/sound';
import { volume } from '../../const/games';
import PossibleAnswerOfAudioCall from '../../components/PossibleAnswerOfAudioCall/PossibleAnswerOfAudioCall';

const wrongSound = 'assets/sounds/wrong.mp3';

const AudioCallGame = (): JSX.Element => {
  const words = useSelector(playWords);
  const currentWord = useSelector(playWord);
  console.log(currentWord);

  const dispatch = useDispatch();

  const [isShowAnswer, setIsShowAnswer] = React.useState(false);

  React.useEffect(() => {
    if (currentWord) {
      const soundUrl = `${process.env.REACT_APP_BASE_URL}/${currentWord.audio}`;
      sound.playSound(soundUrl, volume);
    }
  }, []);
  const onSoundImgClick = () => {
    if (currentWord) {
      const soundUrl = `${process.env.REACT_APP_BASE_URL}/${currentWord.audio}`;
      sound.playSound(soundUrl, volume);
    }
  };

  const onDontKnowBtnClick = () => {
    setIsShowAnswer(true);
    sound.playSound(wrongSound, volume);
    if (currentWord) {
      dispatch(pushWrongAnswers(currentWord));
    }
  };

  const onNextBtnCliclk = () => {
    setIsShowAnswer(false);
  };

  return (
    <div>
      <GameHeader color="yellow" />
      <Container fluid className={styles.container}>
        <Row>
          {!isShowAnswer && (
            <Col lg={12} md={12} sm={12} xs={12}>
              <Image className={styles.img} width="60" height="auto" src={volumeImg} onClick={onSoundImgClick} />
            </Col>
          )}
          {isShowAnswer && currentWord && (
            <>
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
                  <Figure.Caption className={styles.text}>{currentWord.word}</Figure.Caption>
                </Figure>
              </Col>
            </>
          )}
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
                />
              ))}
          </Col>
          {!isShowAnswer && (
            <Col lg={12}>
              <Button onClick={onDontKnowBtnClick} variant="outline-dark">
                Не знаю
              </Button>
            </Col>
          )}
          {isShowAnswer && (
            <Col lg={12}>
              <Button onClick={onNextBtnCliclk} variant="outline-dark">
                Далее
              </Button>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default AudioCallGame;
