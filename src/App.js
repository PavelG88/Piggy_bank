import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';



import './reset.css';
import './common.css';

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
