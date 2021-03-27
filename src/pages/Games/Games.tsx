import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import playImg from '../../assets/icons/play.svg';
import { games, groups } from '../../const/games';
import GameOptions from '../../components/GameOptions/GameOptions';
import styles from './Games.module.css';
import { fetchWords, isPlaying } from '../../features/audioCall/audioCallSlice';
import AudioCallGame from '../AudioCallGame/AudioCallGame';

const Games = (): JSX.Element => {
  const [levelAudioCall, setLevelAudioCall] = React.useState(groups[0]);

  const isAudiocallGamePlaying = useSelector(isPlaying);
  const dispatch = useDispatch();
  const onPlayBtnClick = (gameName: string): void => {
    if (gameName === 'Аудиовызов') {
      // dispatch(fetchWords('2'));
      dispatch(fetchWords(levelAudioCall));
      console.log(levelAudioCall);
    }
  };

  return (
    <div>
      {isAudiocallGamePlaying ? (
        <AudioCallGame />
      ) : (
        <Container>
          <Row>
            {games &&
              games.map((game) => (
                <Col key={game.color} lg={6} md={6} sm={6}>
                  <Container fluid className={styles[game.color]}>
                    <GameOptions gameName={game.name} setLevelAudioCall={setLevelAudioCall} />
                    <span className={styles.bold}>{game.name}</span>
                    <p>{game.description}</p>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        onPlayBtnClick(game.name);
                      }}
                      className={styles.play_img}
                    >
                      <Image width="25" height="auto" src={playImg} fluid />
                    </div>
                  </Container>
                </Col>
              ))}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Games;
