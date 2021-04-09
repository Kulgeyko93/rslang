import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import logoImg from '../../assets/icons/logo.svg';
import menuImg from '../../assets/icons/menu.svg';
import settingsImg from '../../assets/icons/settings.svg';
import styles from './header.module.css';

const imgStyle = {
  marginRight: '30px',
};

const Header = (): JSX.Element => (
  <div className={styles.container}>
    <Container fluid>
      <Row>
        <Col className={styles.left}>
          <NavLink to="/">
            <div className={styles.logo}>
              <Image width="45" height="auto" src={logoImg} fluid />
            </div>
          </NavLink>
        </Col>
        <Col className={styles.right}>
          <div style={imgStyle} className={styles.img}>
            <Image width="20" height="auto" src={settingsImg} fluid />
          </div>
          <div className={styles.img}>
            <Image width="20" height="auto" src={menuImg} fluid />
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Header;
