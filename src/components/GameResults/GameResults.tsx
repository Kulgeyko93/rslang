import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import closeImg from '../../assets/icons/close.svg';
import { setInitSettings, setInitSettingsFromBook, isGameOpenFromTextBook } from '../../features/game/gameSlice';
import { Word } from '../../types';
import GameResultsItem from '../GameResultsItem/GameResultsItem';
import styles from './gameResults.module.css';

type PropsType = {
  correctAnswersArray: Array<Word>;
  wrongAnswersArray: Array<Word>;
};

const GameResults = ({ correctAnswersArray, wrongAnswersArray }: PropsType): JSX.Element => {
  const dispatch = useDispatch();
  const isGameOpenFromBook = useSelector(isGameOpenFromTextBook);

  const onCloseBtnClick = () => {
    if (isGameOpenFromBook) {
      dispatch(setInitSettingsFromBook());
    } else {
      dispatch(setInitSettings());
    }
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
              wrongAnswersArray.map((answer) => <GameResultsItem key={answer.id} answer={answer} />)}
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
              correctAnswersArray.map((answer) => <GameResultsItem key={answer.id} answer={answer} />)}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default GameResults;
