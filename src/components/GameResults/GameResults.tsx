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
  correctAnswers: Array<Word>;
  wrongAnswers: Array<Word>;
  color: string;
};

const GameResults = ({ correctAnswers, wrongAnswers, color }: PropsType): JSX.Element => {
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
    <Container fluid className={styles[color]}>
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
              Ошибок <span className={styles.wrong}>{wrongAnswers.length}</span>
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            {wrongAnswers.length !== 0 &&
              wrongAnswers.map((answer) => <GameResultsItem key={answer.id} answer={answer} />)}
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              Правильно <span className={styles.correct}>{correctAnswers.length}</span>
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            {correctAnswers.length !== 0 &&
              correctAnswers.map((answer) => <GameResultsItem key={answer.id} answer={answer} />)}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default GameResults;
