import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MyTargets.css';
import { connect } from 'react-redux';

class MyTargets extends Component {  

    render() {
        return (
            <div className="my_targets">
                {this.props.targets.map((target) => {
                    return(
                    <>
                        <div className="my_purpose">
                            <div><span className="target_name">{target.targetName}</span></div>               
                            <div className="button">
                                <Link 
                                    to={{
                                        pathname: "/newtarget", 
                                        state: {
                                            target: target
                                        }
                                    }}
                                ><button>ред.</button>
                                </Link>
                                <button onClick = {() => this.props.deleteTarget(target.id)}>x</button>
                            </div>
                        </div>
                        <div className="chart">
                            <div className="chart_text">
                                <div className="chart_text_fact">{target.targetCost} руб.</div>
                                <div className="chart_text_plan">{target.monthPayment} руб.</div>
                            </div>
                            <div className="grafik">
                                <div class="meter">
                                    <span style={{width: target.accumulatedMoney/target.targetCost*100 + "%"}}>
                                        {target.accumulatedMoney/target.targetCost*100 === 100 ? "Цель достигнута!" : target.accumulatedMoney/target.targetCost*100 + "%"}
                                    </span>
                                </div>
                                <div> </div>
                            </div>    
                            <div className="finish">Осталось накопить {target.targetCost-target.accumulatedMoney} руб.</div>   
                        </div>
                    </>
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
        dispatch({
            type: "DELETE_TARGET",
            payload: targetId
            });
        }
})

export default connect(mapStateToProps, mapDispatchToProps)(MyTargets);