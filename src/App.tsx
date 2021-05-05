import React, { useEffect, useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
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
import { selectAuthData, selectAuthStatus, setAuthData, setAuthorizedStatus } from './features/auth/authSlice';
import { TOKEN_EXPIRE_TIME } from './constants/tokenExpireTime';
import { StorageKey, Status } from './types';
import Games from './pages/Games/Games';
import { wrongAnswers, correctAnswers } from './features/game/gameSlice';
import Statistics from './pages/Statistics/Statistics';
import Dictionary from './pages/Dictionary/Dictionary';
import AuthModal from './components/AuthModal';
import { fetchSettings } from './features/settings/settingsSlice';

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const authData = useSelector(selectAuthData);
  const authStatus = useSelector(selectAuthStatus);
  const [authShown, setAuthShown] = useState(false);
  const openAuthModal = () => setAuthShown(true);
  const closeAuthModal = () => setAuthShown(false);
  const correctlyAnsweredWords = useSelector(correctAnswers);
  const wronglyAnsweredWords = useSelector(wrongAnswers);

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

  useEffect(() => {
    if (authStatus === Status.Authorized && authData?.userId) {
      dispatch(fetchSettings());
    }
  }, [authStatus]);

  useEffect(() => {
    async function run() {
      if (authData?.userId && correctlyAnsweredWords.length) {
        const lastWord = correctlyAnsweredWords[correctlyAnsweredWords.length - 1];
        const path = `/users/${authData.userId}/words/${lastWord.id}`;
        try {
          const res = await axios.get(path);
          await axios.put(path, {
            ...res.data,
            optional: {
              correct: (res.data?.optional?.correct || 0) + 1,
            },
          });
        } catch (e) {
          if (e.response.status === 404) {
            await axios.post(path, {
              optional: {
                correct: 1,
              },
            });
          }
        }
      }
    }
    run();
  }, [correctlyAnsweredWords.length]);

  useEffect(() => {
    async function run() {
      if (authData?.userId && wronglyAnsweredWords.length) {
        const lastWord = wronglyAnsweredWords[wronglyAnsweredWords.length - 1];
        const path = `/users/${authData.userId}/words/${lastWord.id}`;
        try {
          const res = await axios.get(path);
          await axios.put(path, {
            ...res.data,
            repeat: true,
            optional: {
              incorrect: (res.data?.optional?.incorrect || 0) + 1,
            },
          });
        } catch (e) {
          if (e.response.status === 404) {
            await axios.post(path, {
              repeat: true,
              optional: {
                incorrect: 1,
              },
            });
          }
        }
      }
    }
    run();
  }, [wronglyAnsweredWords.length]);

  const { pathname } = useLocation();
  const isGamePlaying = pathname.includes('prestart');

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
          <Route exact path="/dictionary/:type/groups/:groupId" component={Group} />
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
      <AuthModal show={authShown} closeAuthModal={closeAuthModal} />
      {!isGamePlaying && <Footer />}
    </div>
  );
};

export default App;
