import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import playImg from '../../assets/icons/play.svg';
import { games } from '../../const/games';
import GameOptions from '../../components/GameOptions/GameOptions';
import styles from './Games.module.css';

const Games = (): JSX.Element => (
  <Container fluid>
    <Container>
      <Row>
        {games &&
          games.map((game) => (
            <Col key={game.color} lg={6} md={6} sm={6}>
              <Container fluid className={styles[game.color]}>
                <GameOptions />
                <span className={styles.bold}>{game.name}</span>
                <p>{game.description}</p>
                <div className={styles.play_img}>
                  <Image width="25" height="auto" src={playImg} fluid />
                </div>
              </Container>
            </Col>
          ))}
      </Row>
    </Container>
  </Container>
);

export default Games;
