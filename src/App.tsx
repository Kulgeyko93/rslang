import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sprinter from './components/Sprinter/Sprinter';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';
import { Counter } from './features/counter/Counter';
import { Words } from './features/words/Words';
import './App.css';
import { loginUser, selectAuthData, setAuthData } from './features/auth/authSlice';
import { STORAGE_KEYS } from './constants';

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const authData = useSelector(selectAuthData);

  useEffect(() => {
    const storedAuth = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (storedAuth) {
      try {
        const authObj = JSON.parse(storedAuth);
        dispatch(setAuthData(authObj));
      } catch (e) {
        /* eslint-disable-next-line no-console */
        console.error(e);
      }
    } else {
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
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(authData));
    }
  }, [authData]);

  return (
    <div className="App">
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/about" component={About} />
          <Route exact path="/counter" component={Counter} />
          <Route exact path="/words" component={Words} />
          <Route path="/sprinter" component={Sprinter} />
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

export default App;
