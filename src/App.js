import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Route path="/" exact component={MainPage} />

      </div>
    );
  }
}

export default App;
