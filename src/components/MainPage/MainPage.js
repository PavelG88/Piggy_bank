import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import NewTarget from '../NewTarget/NewTarget';
import MainStart from '../MainStart/MainStart';

import './MainPage.css';
import MyTargets from '../MyTargets/MyTargets';

class MainPage extends Component {
    render() { 
        return (
            <div className="main-page">
                <div className="header">
                    <Link className="purpose" to="/newtarget"> СОЗДАТЬ ЦЕЛЬ </Link>
                    <Link className="main" to="/">00 </Link>
                    {/* <img src="/img/12.png"></img> */}
                    <Link className="may_purpose" to="/mytargets"> МОИ ЦЕЛИ </Link>
                </div>
                <Route path="/" exact component={MainStart} />
                <Route path="/newtarget" exact component={NewTarget} /> 
                <Route path="/mytargets" exact component={MyTargets} />                  
            </div>
        );
    }
}
 
export default MainPage;