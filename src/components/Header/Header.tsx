/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Nav, Image, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowInRight, BoxArrowLeft, BookmarkXFill, BookmarkCheckFill } from 'react-bootstrap-icons';
import logoImg from '../../assets/icons/logo.svg';
// import menuImg from '../../assets/icons/menu.svg';
// import settingsImg from '../../assets/icons/settings.svg';
import { selectAuthData } from '../../features/auth/authSlice';
import styles from './header.module.css';

const imgStyle = {
  marginRight: '10px',
};

interface Props {
  openAuthModal: () => void;
}

const Header = (props: Props): JSX.Element => {
  const { openAuthModal } = props;
  const authData = useSelector(selectAuthData);

  const [expanded, setExpanded] = React.useState(false);
  const [isSettings, setIsSettings] = React.useState(false);
  const [isTranslate, setIsTranslate] = React.useState(true);
  const [isBtn, setIsBtn] = React.useState(true);

  const signOutButton = <BoxArrowLeft size={20} />;
  const signInButton = <BoxArrowInRight size={20} onClick={openAuthModal} />;
  const handleToggle = () => {
    setExpanded((prevState) => !prevState);
  };

  React.useEffect(() => {
    console.log(window.location.href);
    const isTextBook: boolean = /textbook/.test(window.location.href);
    // const isDictionary = /dictionary/.test(window.location.href);
    if (isTextBook) setIsSettings(true);
  }, []);
  return (
    <div className={styles.container}>

      <Navbar collapseOnSelect expand="md" expanded={expanded} variant="light">
        {/* <Container> */}
        <Navbar.Brand>
          <NavLink to="/">
            <div className={styles.logo} onClick={() => setIsSettings(false)}>
              <Image width="45" height="auto" src={logoImg} fluid />
            </div>
          </NavLink>
        </Navbar.Brand>
        <Nav.Link>
          <div
            style={{ ...imgStyle, width: 20, height: 'auto' }}
            className={styles.img}
            onClick={() => setIsSettings(false)}
          >
            {authData ? signOutButton : signInButton}
          </div>
        </Nav.Link>
        {
          isSettings
            ? (
              <Nav.Item>
                <NavDropdown title="Настройки" id="dropdown-menu-align-right" className={styles.menuItems}>
                  <NavDropdown.Item>
                    <div onClick={() => setIsTranslate(!isTranslate)}>
                      Перевод слова и предложений
                      {
                        isTranslate
                          ? <BookmarkCheckFill className={styles.ok} />
                          : <BookmarkXFill className={styles.no} />
                      }
                    </div>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <div className={styles.menuItems} onClick={() => setIsBtn(!isBtn)}>
                      Кнопки &quot;Сложные слова&quot; и <br />&quot;Удалённые слова&quot;
                      {
                        isBtn
                          ? <BookmarkCheckFill className={styles.ok} />
                          : <BookmarkXFill className={styles.no} />
                      }
                    </div>

                  </NavDropdown.Item>

                </NavDropdown>
              </Nav.Item>
            )
            : ''
        }

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
            <Nav.Item>
              <NavLink to="/dictionary">
                <div className={styles.menuItems} onClick={() => setIsSettings(true)}>
                  Словарь
                </div>
              </NavLink>
            </Nav.Item>
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
        {/* </Container> */}
      </Navbar>
    </div>
  );
};

export default Header;
