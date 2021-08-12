import React, { Component } from 'react';
import './InputMoney.css';

class InputMoney extends Component {
    
    state = {
        messageError: ''
    }

    checkValue = (event) => {
        
        if (this.props.name === 'targetCost') {
            //Проверка введенной суммы цели
            const error = 'Указать число больше 0 (не более двух знаков после запятой)';
            if (!event.target.value || isNaN(event.target.value.replace(/,/, '.')) || event.target.value <= 0) {
                //Проверка, что поле заполнено, что число и больше нуля
                this.setState({messageError: error});

            } else if (event.target.value.replace(/,/, '.').indexOf('.') !== -1) {
                //Проверка, что не более 2-х знаков после запятой
                if (event.target.value.replace(/,/, '.').split('.')[1].length > 2) {
                    this.setState({messageError: error});
                } else {
                    this.setState({messageError: ''});
                }

            } else {
                this.setState({messageError: ''});
            }

        } else if (this.props.name === 'initialPayment') {
            //Проверка первоначального взноса
            if (isNaN(event.target.value.replace(/,/, '.')) || event.target.value < 0) {
                //Проверка, что число и больше нуля
                const error = 'Введена сумма меньше 0';
                this.setState({messageError: error});

            } else if (event.target.value > this.props.targetCost) {
                //Проверка, что меньше суммы цели
                const error = 'Введена сумма больше суммы цели';
                this.setState({messageError: error});

            }  else if (event.target.value > this.props.targetCost) {
                //Проверка, что заполнена цель суммы цели
                const error = 'Укажите необходимую сумму на цель';
                this.setState({messageError: error});

            } else if (event.target.value.replace(/,/, '.').indexOf('.') !== -1) {
                //Проверка, что не более 2-х знаков после запятой
                const error = 'Не более двух знаков после запятой';
                if (event.target.value.replace(/,/, '.').split('.')[1].length > 2) {
                    this.setState({messageError: error});

                } else {
                    this.setState({messageError: ''});
                }

            } else {
                this.setState({messageError: ''});
                
            }
        } else if (this.props.name === 'monthPayment') {

        }
        
        if (this.state.messageError) {
            this.props.action(this.props.name, null, true);
        } else {
            if (this.props.name === 'initialPayment' && !event.target.value) {
                this.props.action(this.props.name, null);
            } else {
                this.props.action(this.props.name, +event.target.value);
            }
        }
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
                        onChange={this.checkValue}
                        value={this.props.value}
                        disabled={this.props.disabled}
                    />
                    <select name={this.props.name} className="input-money__field-select" disabled={this.props.disabled}>
                        <option value="rub">РУБ</option>
                    </select>
                </label>
                <div className={this.state.messageError ? "error" : "error unvisible"}>{this.state.messageError}</div>
            </div>
        );
    }
}
 
export default InputMoney;