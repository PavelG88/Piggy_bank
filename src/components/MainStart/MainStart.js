import React from 'react';
import { connect } from 'react-redux';

import './MainStart.css';

class MainStart extends React.Component {
  render() {
    let sum = 0;
    this.props.targets.forEach((target) => {
      sum += target.accumulatedMoney;
    });
    return (
        <div className="mainstart">       
            <div className="summ_text">КОПИЛКА</div>
                <div className="summ_itog">
                  <div>Всего накоплено:</div>
                  <div className="summ_itog_num">{sum}</div>
                  <div className="summ_itog_val">рублей!!!</div>
            </div>        
            <img src="./img/2644621.svg" alt="wallet"></img>    
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      targets: state.targets
  }
}

export default connect(mapStateToProps)(MainStart);