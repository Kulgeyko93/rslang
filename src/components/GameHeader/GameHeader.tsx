import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import volumeImg from '../../assets/icons/volume.svg';
import muteImg from '../../assets/icons/mute.svg';
import fullscreenImg from '../../assets/icons/fullscreen.svg';
import notfullscreenImg from '../../assets/icons/notfullscreen.svg';
import closeImg from '../../assets/icons/close.svg';
import keyboardImg from '../../assets/icons/keyboard.svg';
import heartImg from '../../assets/icons/heart.svg';
import styles from './GameHeader.module.css';
import { setInitSettings, attempts } from '../../features/game/gameSlice';
import { setSoundsVolume } from '../../features/games/gamesSlice';
import { volume } from '../../const/games';

type PropsType = {
  color: string;
  soundVolume: number;
  gameRef: React.MutableRefObject<HTMLInputElement>;
  isKeyboardActive: boolean;
};

const gameHeaderStyle = {
  imgStyle: {
    marginRight: '30px',
  },
  heartStyle: {
    margin: '0 10px 0 0',
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
              {soundVolume === volume ? (
                <Image width="20" height="auto" src={volumeImg} fluid />
              ) : (
                <Image width="20" height="auto" src={muteImg} fluid />
              )}
            </div>
            {isKeyboardActive && (
              <div>
                <Image width="20" height="auto" src={keyboardImg} fluid />
              </div>
            )}
          </Col>
          {arrayAttempts.length > 0 && (
            <Col className={styles.center}>
              {arrayAttempts.map((item) => (
                <div key={item} style={gameHeaderStyle.heartStyle}>
                  <Image width="13" height="auto" src={heartImg} />
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
              {isFullScreen ? (
                <Image width="20" height="auto" src={notfullscreenImg} fluid />
              ) : (
                <Image width="20" height="auto" src={fullscreenImg} fluid />
              )}
            </div>
            <div className={styles.img} onClick={onCloseBtnClick} role="button" tabIndex={0}>
              <Image width="20" height="auto" src={closeImg} fluid />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GameHeader;
