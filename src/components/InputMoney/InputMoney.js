import React, { Component } from 'react';
import './InputMoney.css';

class InputMoney extends Component {
    state = {
        targetName: null,
        targetCost: null,
        finishDate: null,
        initialPayment: null,
        depositInterest: null,
        mounthPayment: null
    }
    
    render() { 
        return (
            <div className="input-money">
                <label className="input-money__field-label">
                    {this.props.label}  
                    <input 
                        name={this.props.name}
                        id={this.props.name}
                        type={this.props.type}
                        className="input-money__field-input"
                    />
                    <select name={this.props.name} className="input-money__field-select">
                        <option value="rub">Руб.</option>
                    </select>
                </label>
            </div>
        );
    }
}
 
export default InputMoney;