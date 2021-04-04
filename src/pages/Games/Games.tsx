import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import playImg from '../../assets/icons/play.svg';
import { games, volume } from '../../const/games';
import GameOptions from '../../components/GameOptions/GameOptions';
import styles from './Games.module.css';
import {
  fetchWords,
  isLoading,
  isPlaying,
  setCurrentLevel,
  currentLevel,
  isGameOpenFromTextBook,
  setIsPlaying,
  currentGame,
  setCurrentGame,
} from '../../features/game/gameSlice';
// import { setSoundsVolume, currentGame, setCurrentGame } from '../../features/games/gamesSlice';
import { setSoundsVolume } from '../../features/games/gamesSlice';
import AudioCallGame from '../../components/AudioCallGame/AudioCallGame';
import Savannah from '../../components/Savannah/Savannah';
import Sprinter from '../../components/Sprinter/Sprinter';

const Games = (): JSX.Element => {
  const currentGameName = useSelector(currentGame);
  const isGamePlaying = useSelector(isPlaying);
  const isDataLoading = useSelector(isLoading);
  const currentGameLevel = useSelector(currentLevel);
  const isGameOpenFromBook = useSelector(isGameOpenFromTextBook);

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

  React.useEffect(() => {
    if (currentGameName !== '' && !isGameOpenFromBook && isGamePlaying) {
      if (window.localStorage.getItem(currentGameName) !== null) {
        const newValue = localStorage.getItem(currentGameName);
        if (newValue !== null) {
          dispatch(setCurrentLevel(newValue));
          dispatch(fetchWords(newValue));
          console.log(currentGameName, currentGameLevel);
        }
      }
    }
  }, [dispatch, currentGameName]);

  const onPlayBtnClick = (gameName: string): void => {
    dispatch(setCurrentGame(gameName));
    dispatch(setIsPlaying(true));
  };

  return (
    <div>
      {isDataLoading ? (
        <Spinner animation="border" className={styles.spinner} />
      ) : (
        <div>
          {isGamePlaying && currentGameName === games[0].name && <AudioCallGame />}
          {isGamePlaying && currentGameName === games[1].name && <Sprinter />}
          {isGamePlaying && currentGameName === games[2].name && <Savannah />}
          {!isGamePlaying && (
            <Container>
              <h4 className={styles.margin}>Игры</h4>
              <Row>
                {games &&
                  games.map((game) => (
                    <Col key={game.color} lg={6} md={6} sm={6}>
                      <Container fluid className={styles[game.color]}>
                        <GameOptions gameName={game.name} />
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
    </div>
  );
};

export default Games;
