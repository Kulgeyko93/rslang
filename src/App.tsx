import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Sprinter from './components/Sprinter/Sprinter';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';
import Textbook from './pages/Textbook';
import Group from './pages/Group';
import { Counter } from './features/counter/Counter';
import { Words } from './features/words/Words';
import './App.css';
import { loginUser, selectAuthData, setAuthData, setAuthorizedStatus } from './features/auth/authSlice';
import { STORAGE_KEYS, TOKEN_EXPIRE_TIME } from './constants';
import Games from './pages/Games/Games';
import { isPlaying } from './features/game/gameSlice';
import Statistics from './pages/Statistics/Statistics';
import Dictionary from './pages/Dictionary/Dictionary';

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const authData = useSelector(selectAuthData);
  const isGamePlaying = useSelector(isPlaying);

  useEffect(() => {
    let isTokenExpired = true;
    const serializedAuthTime = localStorage.getItem(STORAGE_KEYS.AUTH_TIME);
    if (serializedAuthTime) {
      const authTime = Number(serializedAuthTime);
      const currentTime = new Date().getTime();
      const expiredTime = currentTime - authTime;
      isTokenExpired = expiredTime >= TOKEN_EXPIRE_TIME;
    }
    const serializedAuthData = localStorage.getItem(STORAGE_KEYS.AUTH);
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
      localStorage.removeItem(STORAGE_KEYS.AUTH_TIME);
      localStorage.removeItem(STORAGE_KEYS.AUTH);
      dispatch(
        loginUser({
          email: 'a@a.com',
          password: 'string123',
        }),
      );
    }
  }, []);

  useEffect(() => {
    const storedAuth = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (!storedAuth && authData) {
      const currentTime = new Date().getTime();
      localStorage.setItem(STORAGE_KEYS.AUTH_TIME, String(currentTime));
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(authData));
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
      {!isGamePlaying && <Header />}
      <main>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/about" component={About} />
          <Route exact path="/counter" component={Counter} />
          <Route exact path="/words" component={Words} />
          <Route exact path="/games" component={Games} />
          <Route path="/sprinter" component={Sprinter} />
          <Route exact path="/textbook" component={Textbook} />
          <Route exact path="/groups/:groupId" component={Group} />
          <Route exact path="/statistics" component={Statistics} />
          <Route exact path="/dictionary" component={Dictionary} />
          <Route exact path="/dictionary/learned/groups/:groupId" component={Group} />
          <Route exact path="/dictionary/difficult/groups/:groupId" component={Group} />
          <Route exact path="/dictionary/deleted/groups/:groupId" component={Group} />
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
      {!isGamePlaying && <Footer />}
    </div>
  );
};

export default App;
