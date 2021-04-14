import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import PreStartInfo from './components/PreStartInfo/PreStartInfo';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';
import Textbook from './pages/Textbook';
import Group from './pages/Group';
import { Counter } from './features/counter/Counter';
import { Words } from './features/words/Words';
import './App.css';
import { selectAuthData, setAuthData, setAuthorizedStatus } from './features/auth/authSlice';
import { TOKEN_EXPIRE_TIME } from './constants';
import { StorageKey } from './types';
import Games from './pages/Games/Games';
import { isPlaying } from './features/game/gameSlice';
import Statistics from './pages/Statistics/Statistics';
import Dictionary from './pages/Dictionary/Dictionary';
import AuthModal from './components/AuthModal';

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const authData = useSelector(selectAuthData);
  const isGamePlaying = useSelector(isPlaying);
  const [authShown, setAuthShown] = useState(false);
  const openAuthModal = () => setAuthShown(true);
  const closeAuthModal = () => setAuthShown(false);

  useEffect(() => {
    let isTokenExpired = true;
    const serializedAuthTime = localStorage.getItem(StorageKey.AuthTime);
    if (serializedAuthTime) {
      const authTime = Number(serializedAuthTime);
      const currentTime = new Date().getTime();
      const expiredTime = currentTime - authTime;
      isTokenExpired = expiredTime >= TOKEN_EXPIRE_TIME;
    }
    const serializedAuthData = localStorage.getItem(StorageKey.Auth);
    if (serializedAuthData && !isTokenExpired) {
      try {
        const storedAuthData = JSON.parse(serializedAuthData);
        dispatch(setAuthData(storedAuthData));
      } catch (e) {
        /* eslint-disable-next-line no-console */
        console.error(e);
        dispatch(setAuthData(null));
      }
    } else {
      localStorage.removeItem(StorageKey.AuthTime);
      localStorage.removeItem(StorageKey.Auth);
    }
  }, []);

  useEffect(() => {
    const storedAuth = localStorage.getItem(StorageKey.Auth);
    if (!storedAuth && authData) {
      const currentTime = new Date().getTime();
      localStorage.setItem(StorageKey.AuthTime, String(currentTime));
      localStorage.setItem(StorageKey.Auth, JSON.stringify(authData));
    }
  }, [authData]);

  useEffect(() => {
    if (authData && authData.token) {
      axios.defaults.headers.common.Authorization = `Bearer ${authData.token}`;
      dispatch(setAuthorizedStatus());
    }
  }, [authData]);

  return (
    <div className="App">
      {!isGamePlaying && <Header openAuthModal={openAuthModal} />}
      <main>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/about" component={About} />
          <Route exact path="/counter" component={Counter} />
          <Route exact path="/words" component={Words} />
          <Route exact path="/games" component={Games} />
          <Route exact path="/textbook" component={Textbook} />
          <Route exact path="/groups/:groupId" component={Group} />
          <Route exact path="/statistics" component={Statistics} />
          <Route exact path="/prestart" component={PreStartInfo} />
          <Route exact path="/dictionary" component={Dictionary} />
          <Route exact path="/dictionary/learned/groups/:groupId" component={Group} />
          <Route exact path="/dictionary/difficult/groups/:groupId" component={Group} />
          <Route exact path="/dictionary/deleted/groups/:groupId" component={Group} />
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
      <AuthModal show={authShown} closeAuthModal={closeAuthModal} />
      {!isGamePlaying && <Footer />}
    </div>
  );
};

export default App;
