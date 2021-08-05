import React, { Component } from 'react';
import NewTarget from '../NewTarget/NewTarget';


import './MainPage.css';

class MainPage extends Component {
    render() { 
        return (
            <div className="main-page">
               <NewTarget />
            </div>
        );
    }
}
 
export default MainPage;