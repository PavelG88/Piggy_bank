import React, { Component } from 'react';
import './MainPage.css';

class MainPage extends Component {
    render() { 
        return (
            <div className="main-page">
                <div className="header">
                    <div className="purpose"> СОЗДАТЬ ЦЕЛЬ </div>
                    <div className="may_purpose"> МОИ ЦЕЛИ </div>
                </div>
                <div className="summ">
                    <div className="summ_text">Накоплено!!!</div>
                    <div className="summ_itog">
                        <div className="summ_itog_num">...</div>
                        <div className="summ_itog_val">рублей!!!</div>
                    </div>
                    
                    <div>картинка</div>
                </div>                
            </div>
        );
    }
}
 
export default MainPage;