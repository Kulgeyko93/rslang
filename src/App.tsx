import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import { Counter } from './features/counter/Counter';
import './App.css';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';

const App = (): JSX.Element => (
  <div className="App">
    <Header />
    <main className="main">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/about" component={About} />
        <Route exact path="/counter" component={Counter} />
        <Route path="*" component={NotFound} />
      </Switch>
    </main>
  </div>
);

export default App;
