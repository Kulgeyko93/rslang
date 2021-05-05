/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Nav, Image, Navbar, NavDropdown, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { BookmarkXFill, BookmarkCheckFill, BoxArrowInRight, PersonCheck, ArrowRepeat } from 'react-bootstrap-icons';
import axios from 'axios';
import logoImg from '../../assets/icons/logo.svg';
import { selectAuthData, selectAuthStatus, setAuthData } from '../../features/auth/authSlice';
import InlineSpinner from '../InlineSpinner';
import { Status, StorageKey } from '../../types';
import styles from './header.module.css';
import { selectSettingsData, updateSettings } from '../../features/settings/settingsSlice';

const imgStyle = {
  marginRight: '10px',
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
  const settingsData = useSelector(selectSettingsData);
  const currentSettings = settingsData?.optional;

  const [expanded, setExpanded] = React.useState(false);
  const [isSettings, setIsSettings] = React.useState(false);

  const handleToggle = () => {
    setExpanded((prevState) => !prevState);
  };
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
      <OverlayTrigger trigger="click" placement="right" overlay={popover}>
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

  React.useEffect(() => {
    const isTextBook: boolean = /textbook|group/.test(window.location.href);
    if (isTextBook) setIsSettings(true);
  }, []);
  return (
    <div className={styles.container}>
      <Navbar collapseOnSelect expand="md" expanded={expanded} variant="light">
        <Navbar.Brand>
          <NavLink to="/">
            <div className={styles.logo}>
              <Image width="45" height="auto" src={logoImg} fluid />
            </div>
          </NavLink>
        </Navbar.Brand>
        <Nav.Link>
          <div style={{ ...imgStyle, width: 20, height: 'auto' }} className={styles.img}>
            {authButton}
          </div>
        </Nav.Link>
        {isSettings && currentSettings && userData ? (
          <Nav.Item>
            <NavDropdown title="Настройки" id="dropdown-menu-align-right" className={styles.menuItems}>
              <NavDropdown.Item>
                <div
                  onClick={() =>
                    dispatch(
                      updateSettings({
                        settings: { ...currentSettings, showTranslations: !currentSettings.showTranslations },
                      }),
                    )
                  }
                >
                  Перевод слова и предложений &nbsp;
                  {currentSettings.showTranslations ? (
                    <BookmarkCheckFill className={styles.ok} />
                  ) : (
                    <BookmarkXFill className={styles.no} />
                  )}
                </div>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <div
                  className={styles.menuItems}
                  onClick={() =>
                    dispatch(
                      updateSettings({
                        settings: { ...currentSettings, showControls: !currentSettings.showControls },
                      }),
                    )
                  }
                >
                  Кнопки &quot;Сложные слова&quot; и <br />
                  &quot;Удалённые слова&quot; &nbsp;
                  {currentSettings.showControls ? (
                    <BookmarkCheckFill className={styles.ok} />
                  ) : (
                    <BookmarkXFill className={styles.no} />
                  )}
                </div>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav.Item>
        ) : (
          ''
        )}

        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleToggle} />

        <Navbar.Collapse style={{ width: '100%' }}>
          <Nav className={`mr-auto ${styles.header_menu}`} variant="pills" justify>
            <Nav.Item>
              <NavLink to="/textbook">
                <div className={styles.menuItems} onClick={() => setIsSettings(true)}>
                  Учебник
                </div>
              </NavLink>
            </Nav.Item>
            {authStatus === Status.Authorized && (
              <Nav.Item>
                <NavLink to="/dictionary">
                  <div className={styles.menuItems} onClick={() => setIsSettings(false)}>
                    Словарь
                  </div>
                </NavLink>
              </Nav.Item>
            )}
            <Nav.Item>
              <NavLink to="/Games">
                <div className={styles.menuItems} onClick={() => setIsSettings(false)}>
                  Игры
                </div>
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/statistics">
                <div className={styles.menuItems} onClick={() => setIsSettings(false)}>
                  Статистика
                </div>
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/about">
                <div className={styles.menuItems} onClick={() => setIsSettings(false)}>
                  О команде
                </div>
              </NavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
