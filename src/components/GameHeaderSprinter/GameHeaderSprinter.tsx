import React from 'react';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';

import * as Icon from 'react-bootstrap-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './GameHeader.module.css';
import { setInitSettings } from '../../features/game/gameSlice';

type PropsType = {
  color: string;
  gameRef: React.MutableRefObject<HTMLInputElement>;
  isMuteSound: boolean | null;
  setIsMuteSound: (mute: boolean) => void;
};

const gameHeaderStyle = {
  imgStyle: {
    marginRight: '30px',
    color: '#000',
  },
  heartStyle: {
    margin: '0 10px 0 0',
    color: '#000',
  },
};

const GameHeaderSprinter = ({ color, gameRef, isMuteSound, setIsMuteSound }: PropsType): JSX.Element => {
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [isMute, setIsMute] = React.useState(isMuteSound);
  const dispatch = useDispatch();

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

  const onCloseBtnClick = () => {
    dispatch(setInitSettings());
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
              onClick={() => {
                setIsMuteSound(!isMuteSound);
                setIsMute(!isMute);
              }}
              className={styles.img}
              style={gameHeaderStyle.imgStyle}
            >
              {!isMute ? (
                <Icon.VolumeUpFill />
              ) : (
                <Icon.VolumeMuteFill />
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
                <Icon.Fullscreen />
              ) : (
                <Icon.FullscreenExit />
              )}
            </div>
            <NavLink to="/">
              <div className={styles.img} onClick={onCloseBtnClick} role="button" tabIndex={0}>
                <Icon.XSquare />
              </div>
            </NavLink>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GameHeaderSprinter;
