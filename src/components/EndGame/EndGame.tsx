import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import closeImg from '../../assets/icons/close.svg';
import { endGame } from '../../const/games';
import styles from './endGame.module.css';
import { correctAnswers, setInitSettings, wrongAnswers } from '../../features/game/gameSlice';
import GameResults from '../GameResults/GameResults';

type PropsType = {
  color: string;
};

const EndGame = ({ color }: PropsType): JSX.Element => {
  const dispatch = useDispatch();
  const wrongAnswersArray = useSelector(wrongAnswers);
  const correctAnswersArray = useSelector(correctAnswers);
  const [isShowResult, setIsShowResult] = React.useState(false);
  const onResultBtnClick = () => {
    setIsShowResult(true);
  };

  const onCloseBtnClick = () => {
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
      {isShowResult && <GameResults correctAnswersArray={correctAnswersArray} wrongAnswersArray={wrongAnswersArray} />}
    </>
  );
};

export default EndGame;
