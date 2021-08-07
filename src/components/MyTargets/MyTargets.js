import React, { Component } from 'react';
import './MyTargets.css';


class MyTargets extends Component {
    render() { 
        return (
            <div className="my_targets">
                <div className="my_purpose">
                    <div>На машину</div>               
                    <div className="button">
                        <button>ред.</button>
                        <button>x</button>
                    </div>
                </div>
                <div className="chart">
                    <div className="chart_text">
                        <div className="chart_text_fact">"Сумма" сколько накполено </div>
                        <div className="chart_text_plan">"Сумма" сколько надо</div>
                    </div>
                    <div className="grafik">
                        <div>графа движения</div>
                        <div>% от цели</div>
                    </div>
                    <div className="finish">До цели сталось "сумма"</div>
                </div>
                <button className="new_chart">Новая цель</button>
            </div>
        );
    }
}
 
export default MyTargets;