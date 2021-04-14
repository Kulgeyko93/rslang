import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container, Col, Image, OverlayTrigger, Popover, Row, Button } from 'react-bootstrap';
import { BoxArrowInRight, PersonCheck, ArrowRepeat } from 'react-bootstrap-icons';
import axios from 'axios';
import logoImg from '../../assets/icons/logo.svg';
import menuImg from '../../assets/icons/menu.svg';
import settingsImg from '../../assets/icons/settings.svg';
import styles from './header.module.css';
import { selectAuthData, selectAuthStatus, setAuthData } from '../../features/auth/authSlice';
import InlineSpinner from '../InlineSpinner';
import { Status, StorageKey } from '../../types';

const imgStyle = {
  marginRight: '30px',
};

interface Props {
  openAuthModal: () => void;
}

interface UserData {
  email: string;
  photo_url: string;
}

const Header = (props: Props): JSX.Element => {
  const { openAuthModal } = props;
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const authStatus = useSelector(selectAuthStatus);
  const authData = useSelector(selectAuthData);

  async function fetchAndSetUserData() {
    const userDataFromServer = await axios.get(`/users/${authData?.userId}`);
    if (!userDataFromServer?.data) {
      throw new Error('Недействительный пользователь');
    }
    setUserData(userDataFromServer.data);
  }

  function logoutUser() {
    setIsLoggingOut(true);
    dispatch(setAuthData(null));
    localStorage.removeItem(StorageKey.AuthTime);
    localStorage.removeItem(StorageKey.Auth);
    setTimeout(() => setIsLoggingOut(false), 3000);
  }

  let authButton;
  if (userData) {
    const { email, photo_url: photoUrl } = userData;
    const popover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">{email}</Popover.Title>
        <Popover.Content>
          <Image className="mb-2" width={200} src={photoUrl} rounded />
          <Button disabled={isLoggingOut} onClick={logoutUser} variant="outline-info">
            {isLoggingOut && <InlineSpinner />}
            &nbsp; Разавторизовать
          </Button>
        </Popover.Content>
      </Popover>
    );
    authButton = (
      <OverlayTrigger trigger="click" placement="left" overlay={popover}>
        <PersonCheck size={20} />
      </OverlayTrigger>
    );
  } else if (authData) {
    authButton = <ArrowRepeat size={20} />;
  } else {
    authButton = <BoxArrowInRight size={20} onClick={openAuthModal} />;
  }

  useEffect(() => {
    if (authStatus === Status.Authorized && authData?.userId) {
      try {
        fetchAndSetUserData();
      } catch (e) {
        setUserData(null);
      }
    } else {
      setUserData(null);
    }
  }, [authStatus, authData]);

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
              {authButton}
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
