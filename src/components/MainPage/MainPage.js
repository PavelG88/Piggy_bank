import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadTargetsFromBD } from '../actions/actions';

import NewTarget from '../NewTarget/NewTarget';
import MainStart from '../MainStart/MainStart';

import './MainPage.css';
import MyTargets from '../MyTargets/MyTargets';

class MainPage extends Component {
    componentDidMount() {
        this.props.onLoadTargets();
    }

    render() { 
        return (
            <div className="main-page">
                <div className="header">
                    <Link className="purpose" to="/newtarget"> СОЗДАТЬ ЦЕЛЬ </Link>
                    <Link className="main" to="/"><img src="/img/11.svg" className="main_img" alt="Home"></img> </Link>
                    <Link className="may_purpose" to="/mytargets"> МОИ ЦЕЛИ </Link>
                </div>
                <Route path="/" exact component={MainStart} />
                <Route path="/newtarget" exact component={NewTarget} /> 
                <Route path="/mytargets" exact component={MyTargets} />                  
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onLoadTargets: () => dispatch(loadTargetsFromBD())

});

export default connect(null, mapDispatchToProps)(MainPage);