import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MyTargets.css';
import { connect } from 'react-redux';
import { deleteTarget } from '../actions/actions';

class MyTargets extends Component {  

    state = {
        isConfirm: false,
        targetName: '',
        targetId: null
    }

    confirmationDeletion = (id, targetName) => {
        this.setState({isConfirm: true, targetName: targetName, targetId: id});
    }

    clickDelet = () => {
        this.props.deleteTarget(this.state.targetId);
        this.setState({isConfirm: false, targetName: '', targetId: null});
    }
    
    clickCancel = () => {
        this.setState({isConfirm: false, targetName: '', targetId: null});
    } 

    render() {      
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
                                    <button onClick = {() => this.confirmationDeletion(target.id, target.targetName)}>x</button>
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
                                            {target.accumulatedMoney/target.targetCost*100 === 100 ? "Цель достигнута!" : (Math.round(target.accumulatedMoney/target.targetCost*10000))/100 + "%"}
                                        </span>
                                    </div>
                                </div>    
                                <div className="finish">Осталось накопить {target.targetCost-target.accumulatedMoney} руб.</div>   
                            </div>                        
                        </div>
                        )
                    })}
                                    
                    <Link  to="/newtarget" className="new_chart">Новая цель</Link>

                    <div className={this.state.isConfirm ? "confirm visible" : "confirm unvisible"}>
                        <div className="confirm_wrapper">
                            <p className="confirm_text">Вы уверены, что хотите удалить цель:</p> 
                            <p className="confirm_text-name">{this.state.targetName}</p>
                            <div className="confirm__buttons">
                                <button className="confirm__button" onClick = {this.clickDelet}>Удалить</button>
                                <button className="confirm__button" onClick = {this.clickCancel}>Отменить</button>
                            </div>
                            
                        </div>
                    </div>
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