import React from 'react';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import volumeImg from '../../assets/icons/volume.svg';
import muteImg from '../../assets/icons/mute.svg';
import fullscreenImg from '../../assets/icons/fullscreen.svg';
import notfullscreenImg from '../../assets/icons/notfullscreen.svg';
import closeImg from '../../assets/icons/close.svg';
import styles from './GameHeader.module.css';
import { setInitSettings, setIsPlaying } from '../../features/audiocall/audiocallSlice';
import { setSoundsVolume } from '../../features/games/gamesSlice';
import { volume } from '../../const/games';

type PropsType = {
  color: string;
  soundVolume: number;
};

const gameHeaderStyle = {
  imgStyle: {
    marginRight: '30px',
  },
};

const GameHeader = ({ color, soundVolume }: PropsType): JSX.Element => {
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   if (isFullScreen) {
  //     gameRef.current.cancelFullScreen();
  //     console.log('refNoFull', gameRef.current);
  //   } else {
  //     gameRef.current.requestFullScreen();
  //     console.log('refYesFull', gameRef.current);
  //   }
  // }, [isFullScreen]);

  React.useEffect(() => {
    window.localStorage.setItem('volume', soundVolume.toString());
  }, [dispatch, soundVolume]);

  const onCloseBtnClick = () => {
    dispatch(setIsPlaying(false));
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
            <div role="button" tabIndex={0} onClick={onVolumeBtnClick} className={styles.img}>
              {soundVolume === volume ? (
                <Image width="20" height="auto" src={volumeImg} fluid />
              ) : (
                <Image width="20" height="auto" src={muteImg} fluid />
              )}
            </div>
          </Col>
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
