import React, { Component } from 'react';
import './InputArea.css';

class InputArea extends Component {
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
            <div className="input-area">
                <label className="input-area__field-label">
                    {this.props.label}  
                    <input 
                        name={this.props.name}
                        id={this.props.name}
                        type={this.props.type}
                        className="input-area__field-input"
                    />
                </label>
            </div>
        );
    }
}
 
export default InputArea;