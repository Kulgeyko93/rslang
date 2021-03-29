import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import playImg from '../../assets/icons/play.svg';
import { games, groups, volume } from '../../const/games';
import GameOptions from '../../components/GameOptions/GameOptions';
import styles from './Games.module.css';
import { fetchWords, isLoading, isPlaying } from '../../features/audiocall/audiocallSlice';
import { setSoundsVolume } from '../../features/games/gamesSlice';
import AudioCallGame from '../../components/AudioCallGame/AudioCallGame';

const Games = (): JSX.Element => {
  const [levelAudioCall, setLevelAudioCall] = React.useState(groups[0]);

  const isAudiocallGamePlaying = useSelector(isPlaying);
  const isDataLoading = useSelector(isLoading);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (window.localStorage.getItem('volume') !== null) {
      const newVolume = localStorage.getItem('volume');
      if (newVolume !== null) {
        dispatch(setSoundsVolume(parseFloat(newVolume)));
      }
    } else {
      window.localStorage.setItem('volume', volume.toString());
    }
  }, [dispatch]);

  const onPlayBtnClick = (gameName: string): void => {
    if (gameName === 'Аудиовызов') {
      dispatch(fetchWords(levelAudioCall));
    }
  };

  return (
    <>
      {isDataLoading ? (
        <Spinner animation="border" className={styles.spinner} />
      ) : (
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
      )}
    </>
  );
};

export default Games;
