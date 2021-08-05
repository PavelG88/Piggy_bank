import React from 'react';

import './MainStart.css';

class MainStart extends React.Component {
  render() {
    return (
        <div className="mainstart">       
            <div className="summ_text">КОПИЛКА</div>
            <div className="summ_itog">
                <div>Всего накоплено:</div>
                <div className="summ_itog_num">...</div>
                <div className="summ_itog_val">рублей!!!</div>
            </div>        
            <img src="./img/2644621.svg" alt="wallet" ></img>    
        </div>
    );
  }
}

export default MainStart;