import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import './App.css';

const App = (): JSX.Element => (
  <div className="App">
    <Header />
    <main className="main">
      <Switch>
        <Route exact path="/" component={Main} />
        {/* <Route path="/country/:name" component={Country} /> */}
      </Switch>
    </main>

  </div>
);

export default App;
