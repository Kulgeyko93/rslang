import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavLink } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import styles from './GameHeader.module.css';
import { setInitSettings, attempts } from '../../features/game/gameSlice';
import { setSoundsVolume } from '../../features/games/gamesSlice';
import { volume } from '../../constants/games';

type PropsType = {
  color: string;
  soundVolume: number;
  gameRef: React.MutableRefObject<HTMLInputElement>;
  isKeyboardActive: boolean;
};

const gameHeaderStyle = {
  imgStyle: {
    marginRight: '30px',
    color: '#000',
    fontSize: '30px',
  },
  heartStyle: {
    margin: '0 10px 0 0',
    color: '#ff0000',
  },
  keyboard: {
    color: '#000',
    fontSize: '30px',
  },
};

const GameHeader = ({ color, soundVolume, gameRef, isKeyboardActive }: PropsType): JSX.Element => {
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  const dispatch = useDispatch();

  const arrayAttempts = useSelector(attempts);

  React.useEffect(() => {
    if (!isFullScreen) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    } else {
      gameRef.current.requestFullscreen().catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
    }
  }, [isFullScreen]);

  React.useEffect(() => {
    window.localStorage.setItem('volume', soundVolume.toString());
  }, [dispatch, soundVolume]);

  const onCloseBtnClick = () => {
    dispatch(setInitSettings());
  };

  const onVolumeBtnClick = () => {
    if (soundVolume === volume) {
      dispatch(setSoundsVolume(0));
    } else {
      dispatch(setSoundsVolume(volume));
    }
  };

  const onFullScreenBtnClick = () => {
    setIsFullScreen((isFullscreen) => !isFullscreen);
  };

  return (
    <div className={styles[color]}>
      <Container fluid className={styles.container}>
        <Row>
          <Col className={styles.left}>
            <div
              role="button"
              tabIndex={0}
              onClick={onVolumeBtnClick}
              className={styles.img}
              style={gameHeaderStyle.imgStyle}
            >
              {soundVolume === volume ? <Icon.VolumeUpFill /> : <Icon.VolumeMuteFill />}
            </div>
            {isKeyboardActive && (
              <div style={gameHeaderStyle.keyboard}>
                <Icon.Keyboard />
              </div>
            )}
          </Col>
          {arrayAttempts.length > 0 && (
            <Col className={styles.center}>
              {arrayAttempts.map((item) => (
                <div key={item} style={gameHeaderStyle.heartStyle}>
                  <Icon.HeartFill />
                </div>
              ))}
            </Col>
          )}
          <Col className={styles.right}>
            <div
              role="button"
              tabIndex={0}
              onClick={onFullScreenBtnClick}
              style={gameHeaderStyle.imgStyle}
              className={styles.img}
            >
              {isFullScreen ? <Icon.Fullscreen /> : <Icon.FullscreenExit />}
            </div>
            <NavLink to="/">
              <div style={gameHeaderStyle.imgStyle} onClick={onCloseBtnClick} role="button" tabIndex={0}>
                <Icon.XSquare />
              </div>
            </NavLink>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GameHeader;
