import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import closeImg from '../../assets/icons/close.svg';
import { endGame } from '../../const/games';
import AudioCallResults from '../AudioCallResults/AudioCallResults';
import styles from './EndAudioCall.module.css';
import {
  correctAnswers,
  setInitSettings,
  setIsGameEnd,
  setIsPlaying,
  wrongAnswers,
} from '../../features/audiocall/audiocallSlice';

type PropsType = {
  color: string;
};

const EndAudioCall = ({ color }: PropsType): JSX.Element => {
  const dispatch = useDispatch();
  const wrongAnswersArray = useSelector(wrongAnswers);
  const correctAnswersArray = useSelector(correctAnswers);
  const [isShowResult, setIsShowResult] = React.useState(false);
  const onResultBtnClick = () => {
    setIsShowResult(true);
  };

  const onCloseBtnClick = () => {
    dispatch(setIsPlaying(false));
    dispatch(setIsGameEnd(false));
    dispatch(setInitSettings());
  };
  return (
    <>
      {!isShowResult && (
        <Container fluid className={styles[color]}>
          <Container className={styles.container}>
            <Row>
              <Col>
                <div className={styles.img} onClick={onCloseBtnClick} role="button" tabIndex={0}>
                  <Image width="10" height="auto" src={closeImg} fluid />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>{wrongAnswersArray.length === 0 ? endGame.messageIfNoErrors : endGame.messageIfErrors}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>
                  правильно: {correctAnswersArray.length}, ошибок: {wrongAnswersArray.length}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button onClick={onResultBtnClick} variant="outline-dark">
                  Результаты игры
                </Button>
              </Col>
            </Row>
          </Container>
        </Container>
      )}
      {isShowResult && (
        <AudioCallResults correctAnswersArray={correctAnswersArray} wrongAnswersArray={wrongAnswersArray} />
      )}
    </>
  );
};

export default EndAudioCall;
