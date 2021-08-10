import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MyTargets.css';
import { connect } from 'react-redux';

class MyTargets extends Component {


    render() {
    // console.log(this.props.targets)

    // onRemoveClick = (id) => {
    //     const clone = this.props.targets.filter(
    //                      (item)=> item.id !== name
    //                   );
    //     this.setState.props({ targets: clone });
    //   };
    console.log(this.props.targets[0].id)
        return (
            <div className="my_targets">
                {this.props.targets.map((target) => {
                    return(
                    <>
                        <div className="my_purpose">
                            <div><span className="target_name">{target.targetName}</span></div>               
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
                            <div className="grafik">
                                <div class="meter">
                                    <span style={{width: target.targetCost/target.monthPayment*100 + "%"}}>{target.targetCost/target.monthPayment*100}% </span>
                                </div>
                                <div> </div>
                            </div>    
                            <div className="finish">Осталось накопить {target.monthPayment-target.targetCost} руб.</div>   
                        </div>
                    </>
                    )
                })}
                                
                <Link  to="/newtarget" className="new_chart">Новая цель</Link>
            </div>
        )
    }
}

// const deleteTarget = (targetId) => {
//         for(let i = 0; i < targetId.length) {
            
//         }
//     // if (targetId === this.props.targets[].id) {
//     //     console.log("222", this.props.targets[0].id)
//     //    return targetId
       
//     // }
// };
// console.log('111', deleteTarget)





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