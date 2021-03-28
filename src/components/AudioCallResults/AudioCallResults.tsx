import React from 'react';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import closeImg from '../../assets/icons/close.svg';
import styles from './AudioCallResults.module.css';
import AudioCallResultsItem from '../AudioCallResultsItem/audioCallResultsItem';
import { setInitSettings, setIsGameEnd, setIsPlaying } from '../../features/audioCall/audioCallSlice';
import { Word } from '../../features/types';
// import {
//   isGameEnd,
//   playWord,
//   playWords,
//   pushWrongAnswers,
//   setCurrentWord,
//   setCurrentWordIndex,
//   setPlayWordsArray,
// } from '../../features/audioCall/audioCallSlice';
// import { volume } from '../../const/games';

type PropsType = {
  correctAnswersArray: Array<Word>;
  wrongAnswersArray: Array<Word>;
};

const AudioCallResults = ({ correctAnswersArray, wrongAnswersArray }: PropsType): JSX.Element => {
  const dispatch = useDispatch();

  const onCloseBtnClick = () => {
    dispatch(setIsPlaying(false));
    dispatch(setIsGameEnd(false));
    dispatch(setInitSettings());
  };

  return (
    <Container fluid className={styles.container}>
      <Row>
        <Col>
          <div onClick={onCloseBtnClick} className={styles.closeImg} role="button" tabIndex={0}>
            <Image width="20" height="auto" src={closeImg} fluid />
          </div>
        </Col>
      </Row>
      <Container>
        <Row>
          <Col>
            <p>
              Ошибок <span className={styles.wrong}>{wrongAnswersArray.length}</span>
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            {wrongAnswersArray.length !== 0 &&
              wrongAnswersArray.map((answer) => <AudioCallResultsItem key={answer.id} answer={answer} />)}
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              Правильно <span className={styles.correct}>{correctAnswersArray.length}</span>
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            {correctAnswersArray.length !== 0 &&
              correctAnswersArray.map((answer) => <AudioCallResultsItem key={answer.id} answer={answer} />)}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default AudioCallResults;
