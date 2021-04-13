/* eslint-disable react/no-danger */
import React from 'react';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Image from 'react-bootstrap/Image';
import { NavLink } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
// import playImg from '../../assets/icons/play.svg';
import { games } from '../../const/games';
import GameOptions from '../../components/GameOptions/GameOptions';
import styles from './Games.module.css';
import {
  setCurrentGame,
} from '../../features/game/gameSlice';

const Games = (): JSX.Element => {
  const dispatch = useDispatch();

  const onPlayBtnClick = (gameName: string): void => {
    dispatch(setCurrentGame(gameName));
  };

  return (
    <Container>
      <h4 className={styles.margin}>Игры</h4>
      <Row>
        {games &&
          games.map((game) => (
            <Col key={game.color} lg={6} md={6} sm={6} className={styles.item}>
              <Container fluid>
                {/* <Container fluid className={styles[game.color]}> */}
                <Card className={styles.card}>
                  <Card.Header>{game.name.toUpperCase()}</Card.Header>
                  <Card.Img variant="top" src={`${game.img}`} />
                  <Card.Body>
                    <Card.Title>
                      <GameOptions gameName={game.name} />
                    </Card.Title>
                    <Card.Text dangerouslySetInnerHTML={{ __html: game.description }} />
                    <NavLink to="prestart">
                      <Button
                        className={styles.gameBtn}
                        variant="primary"
                        onClick={() => {
                          onPlayBtnClick(game.name);
                        }}
                      >
                        Играть
                      </Button>
                    </NavLink>
                  </Card.Body>
                </Card>

                {/* <GameOptions gameName={game.name} />
                <span className={styles.bold}>{game.nameRU}</span>
                <p>{game.description}</p>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    onPlayBtnClick(game.name);
                  }}
                  className={styles.play_img}
                >
                  <NavLink to="prestart">
                    <Image width="25" height="auto" src={playImg} fluid />
                  </NavLink>
                </div> */}
              </Container>
            </Col>
          ))}
      </Row>
      {/* <Row>
        <Container>
          <Card style={{ width: '18rem' }}>
            <Card.Header>{games[0].name}</Card.Header>
            <Card.Img variant="top" src={`${games[0].img}`} />
            <Card.Body>
              <Card.Title>
                <GameOptions gameName={game.name} />
              </Card.Title>
              <Card.Text>{games[0].description}</Card.Text>
              <NavLink to="prestart">
                <Button
                  variant="primary"
                  onClick={() => {
                    onPlayBtnClick(games[0].name);
                  }}
                >
                  Играть
                </Button>
              </NavLink>
            </Card.Body>
          </Card>
        </Container>
      </Row> */}
    </Container>
  );
};

export default Games;
