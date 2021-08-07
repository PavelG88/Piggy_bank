import React, { Component } from 'react';
import MainStart from '../MainStart/MainStart'
import './MainPage.css';
import { Route } from 'react-router-dom';
import MyTargets from '../MyTargets/MyTargets';

class MainPage extends Component {
    render() { 
        return (
            <div className="main-page">
                <div className="header">
                    <button className="purpose"> СОЗДАТЬ ЦЕЛЬ </button>
                    <button className="may_purpose"> МОИ ЦЕЛИ </button>
                </div>
                <Route path="/" exact component={MainStart} /> 
                <Route path="/mytargets" exact component={MyTargets} />            
            </div>
        );
    }
}
 
export default MainPage;