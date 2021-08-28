import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MyTargets.css';
import { connect } from 'react-redux';
import { deleteTarget } from '../actions/actions';
import store from "../../redux/store";

class MyTargets extends Component {  

    render() {
        let i = 0;
        return (
            <div className="my_targets">
                {this.props.targets.map((target) => {
                    return(        
                        <div key={target.id}>
                            <div className="my_purpose">
                                <div><span className="target_name">{target.targetName}</span></div>               
                                <div className="button">
                                    <Link 
                                        to={{
                                            pathname: "/newtarget", 
                                            state: {
                                                target: target
                                            }
                                        }}>
                                        <button>ред.</button>
                                    </Link>
                                    <button onClick = {() => this.props.deleteTarget(target.id)}>x</button>
                                </div>
                            </div>
                            <div className="chart">
                                <div className="chart_text">
                                    <div className="chart_text_fact">{target.accumulatedMoney} руб.</div>
                                    <div className="chart_text_plan">{target.targetCost} руб.</div>
                                </div>
                                <div className="grafik">
                                    <div class="meter">
                                        <span style={{width: target.accumulatedMoney/target.targetCost*100 + "%"}}>
                                            {target.accumulatedMoney/target.targetCost*100 === 100 ? "Цель достигнута!" : Math.round(target.accumulatedMoney/target.targetCost*10000)/100 + "%"}
                                        </span>
                                    </div>
                                    <div> </div>
                                </div>    
                                <div className="finish">Осталось накопить {target.targetCost-target.accumulatedMoney} руб.</div>   
                            </div>                        
                        </div>
                        )
                    })}
                                    
                    <Link  to="/newtarget" className="new_chart">Новая цель</Link>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        targets: state.targets
    }
 }

const mapDispatchToProps = dispatch => ({
    deleteTarget: (targetId) => {
        dispatch(deleteTarget(targetId));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MyTargets);