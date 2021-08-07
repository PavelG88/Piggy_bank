import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import NewTarget from '../NewTarget/NewTarget';
import MainStart from '../MainStart/MainStart';

import './MainPage.css';


class MainPage extends Component {
    render() { 
        return (
            <div className="main-page">
                <div className="header">
                    <Link className="purpose" to="/newtarget"> СОЗДАТЬ ЦЕЛЬ </Link>
                    <button className="may_purpose"> МОИ ЦЕЛИ </button>
                </div>
                <Route path="/" exact component={MainStart} />
                <Route path="/newtarget" exact component={NewTarget} /> 
                                     
            </div>
        );
    }
}
 
export default MainPage;