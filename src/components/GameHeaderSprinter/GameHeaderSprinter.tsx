import React from 'react';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import fullscreenImg from '../../assets/icons/fullscreen.svg';
import notfullscreenImg from '../../assets/icons/notfullscreen.svg';
import closeImg from '../../assets/icons/close.svg';
import styles from './GameHeader.module.css';
import { setInitSettings } from '../../features/game/gameSlice';

type PropsType = {
  color: string;
  gameRef: React.MutableRefObject<HTMLInputElement>;
};

const gameHeaderStyle = {
  imgStyle: {
    marginRight: '30px',
  },
  heartStyle: {
    margin: '0 10px 0 0',
  },
};

const GameHeaderSprinter = ({ color, gameRef }: PropsType): JSX.Element => {
  const [isFullScreen, setIsFullScreen] = React.useState(false);

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
            <NavLink to="/">
              <div className={styles.img} onClick={onCloseBtnClick} role="button" tabIndex={0}>
                <Image width="20" height="auto" src={closeImg} fluid />
              </div>
            </NavLink>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GameHeaderSprinter;
