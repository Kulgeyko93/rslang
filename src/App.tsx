import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import { Counter } from './features/counter/Counter';
import { Words } from './features/words/Words';
import './App.css';

const App = (): JSX.Element => (
  <div className="App">
    <Header />
    <main className="main">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/counter" component={Counter} />
        <Route exact path="/words" component={Words} />
      </Switch>
    </main>
  </div>
);

export default App;
