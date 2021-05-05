/* eslint-disable react/no-danger */
import React from 'react';
import { Container, Button, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { games, volume } from '../../constants/games';
import {
  setPlayWordsArray,
  setCurrentWord,
  fetchWords,
  isLoading,
  isPlaying,
  setCurrentLevel,
  currentLevel,
  isGameOpenFromTextBook,
  setIsPlaying,
  currentGame,
  setCurrentGame,
  setOriginWordsArray,
  originWordsArray,
} from '../../features/game/gameSlice';
import AudioCallGame from '../AudioCallGame/AudioCallGame';
import Savannah from '../Savannah/Savannah';
import Sprinter from '../Sprinter/Sprinter';
import OurGame from '../OurGame/OurGame';
import { setSoundsVolume } from '../../features/games/gamesSlice';
import styles from './preStartInfo.module.scss';

const PreStartInfo = (): JSX.Element => {
  const dispatch = useDispatch();

  const currentGameName = useSelector(currentGame);
  const isGamePlaying = useSelector(isPlaying);
  const isDataLoading = useSelector(isLoading);
  const currentGameLevel = useSelector(currentLevel);
  const isGameOpenFromBook = useSelector(isGameOpenFromTextBook);
  const originWords = useSelector(originWordsArray);
  const gameNameReverse = currentGameName.split('').reverse().join('');
  const [indexGame, setIndexGame] = React.useState<number>(0);

  React.useEffect(() => {
    switch (currentGameName) {
      case games[0].name: {
        setIndexGame(0);
        break;
      }
      case games[1].name: {
        setIndexGame(1);
        break;
      }
      case games[2].name: {
        setIndexGame(2);
        break;
      }
      case games[3].name: {
        setIndexGame(3);
        break;
      }
      default: {
        // eslint-disable-next-line no-console
        console.error("don't have game");
      }
    }
  }, [currentGameName]);

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
    if (currentGameName !== '' && isGamePlaying) {
      if (!isGameOpenFromBook) {
        if (window.localStorage.getItem(currentGameName) !== null) {
          const newValue = localStorage.getItem(currentGameName);
          if (newValue !== null) {
            dispatch(setCurrentLevel(newValue));
            dispatch(fetchWords(currentGameLevel));
          }
        }
      } else {
        dispatch(setOriginWordsArray(originWords));
        dispatch(setPlayWordsArray());
        dispatch(setCurrentWord());
      }
    }
  }, [dispatch, isGamePlaying]);

  const onPlayBtnClick = (game: string): void => {
    dispatch(setCurrentGame(game));
    dispatch(setIsPlaying(true));
  };
  return (
    <>
      {isDataLoading ? (
        <Spinner animation="border" className={styles.spinner} />
      ) : (
        <>
          {isGamePlaying && currentGameName === games[0].name && <AudioCallGame />}
          {isGamePlaying && currentGameName === games[1].name && <Sprinter />}
          {isGamePlaying && currentGameName === games[2].name && <Savannah />}
          {isGamePlaying && currentGameName === games[3].name && <OurGame />}

          {!isGamePlaying && (
            <div>
              <img src={`${games[indexGame].img}`} alt="лес и горы" className={styles.background} />
              <Container fluid className={styles.container}>
                <div className={styles.gameName}>
                  <h2>{gameNameReverse.toUpperCase()}</h2>
                  <h2>{currentGameName.toUpperCase()}</h2>
                </div>

                <div className={styles.description}>
                  <span dangerouslySetInnerHTML={{ __html: games[indexGame].description }} />
                </div>
                <NavLink to="/">
                  <Button className={styles.startBtn}>В меню</Button>
                </NavLink>

                {currentGameName && (
                  <Button className={styles.startBtn} onClick={() => onPlayBtnClick(currentGameName)}>
                    Начать игру
                  </Button>
                )}
              </Container>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PreStartInfo;
