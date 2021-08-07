import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MyTargets.css';
import { connect } from 'react-redux';

class MyTargets extends Component {

    render() {
    //    console.log(targets[i])
        return (
            <div className="my_targets">
                {this.props.targets.forEach((target) => {
                    <div className="my_purpose">
                    <div>{target.targetName}</div>               
                        <div className="button">
                            <button>ред.</button>
                            <button>x</button>
                        </div>
                    </div>
                    <div className="chart">
                        <div className="chart_text">
                            <div className="chart_text_fact">{target.targetCost} руб.</div>
                            <div className="chart_text_plan">{target.monthPayment} руб.</div>
                        </div>
                    </div>
                    <div className="grafik">
                        <div class="meter">
                            <span style={{width: target.targetCost/target.monthPayment*100 + "%"}}></span>
                        </div>
                        <div> {target.targetCost/target.monthPayment*100}% от цели</div>
                    </div>
                    <div className="finish">До цели сталось {target.monthPayment-target.targetCost} руб.</div>
                    </div>
                });}
                                
                <Link  to="/newtarget" className="new_chart">Новая цель</Link>
            </div>
        )
    }
}


// getDataProps () => {
//     for(let i = 0; i < this.props.targets.length; i++) {
//         targets[i] = this.props.targets[i].length
//     }
// };






 const mapStateToProps = (state) => {
     return {
         targets: state.targets
     }
 }

export default connect(mapStateToProps)(MyTargets);