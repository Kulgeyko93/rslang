/* eslint-disable react/no-danger */
import React from 'react';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavLink } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { games } from '../../constants/games';
import GameOptions from '../../components/GameOptions/GameOptions';
import styles from './Games.module.css';
import { setCurrentGame, setIsGameOpenFromTextBook } from '../../features/game/gameSlice';

const imgStyle = {
  height: '280px',
  objectFit: 'cover',
} as React.CSSProperties;

const Games = (): JSX.Element => {
  const dispatch = useDispatch();

  const onPlayBtnClick = (gameName: string): void => {
    dispatch(setCurrentGame(gameName));
    dispatch(setIsGameOpenFromTextBook(false));
  };

  return (
    <Container>
      <h4 className={styles.margin}>Игры</h4>
      <Row>
        {games &&
          games.map((game) => (
            <Col key={game.color} lg={6} md={12} sm={12} className={styles.item}>
              <Container fluid>
                <Container fluid className={styles[game.color]}>
                  <Card className={styles.card}>
                    <Card.Header>{game.nameRU.toUpperCase()}</Card.Header>
                    <Card.Img variant="top" src={`${game.img}`} style={imgStyle} />
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
                </Container>
              </Container>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Games;
