import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { BoxArrowInRight, BoxArrowLeft } from 'react-bootstrap-icons';
import logoImg from '../../assets/icons/logo.svg';
import menuImg from '../../assets/icons/menu.svg';
import settingsImg from '../../assets/icons/settings.svg';
import styles from './header.module.css';
import { selectAuthData } from '../../features/auth/authSlice';

const imgStyle = {
  marginRight: '30px',
};

interface Props {
  openAuthModal: () => void;
}

const Header = (props: Props): JSX.Element => {
  const { openAuthModal } = props;
  const authData = useSelector(selectAuthData);

  const signOutButton = <BoxArrowLeft size={20} />;
  const signInButton = <BoxArrowInRight size={20} onClick={openAuthModal} />;

  return (
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
            <div style={{ ...imgStyle, width: 20, height: 'auto' }} className={styles.img}>
              {authData ? signOutButton : signInButton}
            </div>
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
};

export default Header;
