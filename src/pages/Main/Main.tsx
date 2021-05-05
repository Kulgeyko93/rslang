import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FigureItem from '../../components/FigureItem/FigureItem';
import Games from '../Games/Games';
import mainScreenImg from '../../assets/main_screen.png';
import booksImg from '../../assets/icons/books.svg';
import gameImg from '../../assets/icons/game.svg';
import warningImg from '../../assets/icons/warning.svg';
import progressImg from '../../assets/icons/progress.svg';
import styles from './Main.module.css';
// import Video from '../../components/Video/Video';

const Main = (): JSX.Element => (
  <div className={styles.main}>
    <Container fluid>
      <img className={styles.mainScreenImg} src={mainScreenImg} alt="Английский - это легко с RS LANG" />
      <hr className={styles.color} />
      {/* <h5 className={styles.margin}>Посмотри видео, чтобы узнать, как работает приложение</h5>
      <Video /> */}
      <h4 className={styles.margin}>Учи английский с RS LANG</h4>
      <Container>
        <Row>
          <Col lg={3} md={6} sm={6} xs={6}>
            <FigureItem img={booksImg} text="Увеличивай словарный запас" />
          </Col>
          <Col lg={3} md={6} sm={6} xs={6}>
            <FigureItem img={gameImg} text="Играй и запоминай слова" />
          </Col>
          <Col lg={3} md={6} sm={6} xs={6}>
            <FigureItem img={warningImg} text="Отмечай сложные слова" />
          </Col>
          <Col lg={3} md={6} sm={6} xs={6}>
            <FigureItem img={progressImg} text="Отслеживай свой прогресс" />
          </Col>
        </Row>
        <Row>
          <Col className={styles.games}>
            <Games />
          </Col>
        </Row>
      </Container>
    </Container>
  </div>
);

export default Main;
