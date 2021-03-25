import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import volumeImg from '../../assets/icons/volume.svg';
// import muteImg from '../../assets/icons/mute.svg';
import fullscreenImg from '../../assets/icons/fullscreen.svg';
// import notfullscreenImg from '../../assets/icons/notfullscreen.svg';
import closeImg from '../../assets/icons/close.svg';
import styles from './GameHeader.module.css';

type PropsType = {
  color: string;
};

const gameHeaderStyle = {
  imgStyle: {
    marginRight: '30px',
  },
};

const GameHeader = ({ color }: PropsType): JSX.Element => (
  <div className={styles[color]}>
    <Container fluid className={styles.container}>
      <Row>
        <Col className={styles.left}>
          <div className={styles.img}>
            <Image width="20" height="auto" src={volumeImg} fluid />
          </div>
        </Col>
        <Col className={styles.right}>
          <div style={gameHeaderStyle.imgStyle} className={styles.img}>
            <Image width="20" height="auto" src={fullscreenImg} fluid />
          </div>
          <div className={styles.img}>
            <Image width="20" height="auto" src={closeImg} fluid />
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default GameHeader;
