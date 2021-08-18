import React, { Component } from 'react';
import './InputMoney.css';

class InputMoney extends Component {
    
    state = {
        messageError: ''
    }

    checkValue = (event) => {
        let isError = true;

        if (this.props.name === 'targetCost') {
            //Проверка введенной суммы цели
            const error = 'Указать число больше 0';
            if (!event.target.value || isNaN(event.target.value.replace(/,/, '.')) || event.target.value <= 0) {
                //Проверка, что поле заполнено, что число и больше нуля
                this.setState({messageError: error});

            // } else if (event.target.value.replace(/,/, '.').indexOf('.') !== -1) {
            //     //Проверка, что не более 2-х знаков после запятой
            //     if (event.target.value.replace(/,/, '.').split('.')[1].length > 2) {
            //         this.setState({messageError: error});
            //     } else {
            //         this.setState({messageError: ''});
            //         isError = false;
            //     }

            } else if (!this.props.isCorrectInitialPayment) {
                //Проверка, что корректно относительно первоначального взноса
                const errorInitialPayment = 'Введенная сумма меньше первоначального взноса';
                this.setState({messageError: errorInitialPayment});
                isError = false; // т.к. проверяется в компоненте NewTarget

            } else {
                this.setState({messageError: ''});
                isError = false;
            }

        } else if (this.props.name === 'initialPayment') {
            //Проверка первоначального взноса
            if (isNaN(event.target.value.replace(/,/, '.')) || event.target.value < 0) {
                //Проверка, что число и больше нуля
                const error = 'Введите число больше 0';
                this.setState({messageError: error});

            // } else if (event.target.value.replace(/,/, '.').indexOf('.') !== -1) {
            //     //Проверка, что не более 2-х знаков после запятой
            //     const error = "Не более 2-х знаков после запятой"
            //     if (event.target.value.replace(/,/, '.').split('.')[1].length > 2) {
            //         this.setState({messageError: error});
            //     } else {
            //         this.setState({messageError: ''});
            //         isError = false;
            //     }

            } else if (!this.props.isCorrectInitialPayment) {
                //Проверка, что корректно относительно первоначального взноса
                const error = 'Введенная сумма больше суммы цели';
                this.setState({messageError: error});
                isError = false; // т.к. проверяется в компоненте NewTarget

            } else {
                this.setState({messageError: ''});
                isError = false;                
            }
            
        } else if (this.props.name === 'monthPayment') {

        }

        if (isError) {
            this.props.action(this.props.name, null, true);
        } else {
            this.props.action(this.props.name, Number(event.target.value.replace(/,/, '.')));
        }
    }
    
    render() {

        //Проверка, что меньше суммы цели
        if (this.props.name === 'targetCost' || this.props.name === 'initialPayment') {
            const errorTargetCost = 'Введенная сумма меньше первоначального взноса';
            const errorInitialPayment = 'Введенная сумма больше суммы цели';

            if (this.props.isCorrectInitialPayment && (this.state.messageError === errorTargetCost || this.state.messageError === errorInitialPayment)) {               
                this.setState({messageError: ''});    
            } 
            
            if (!this.props.isCorrectInitialPayment && 
                ((this.props.name === 'targetCost' && this.state.messageError !== errorTargetCost) || 
                (this.props.name === 'initialPayment' && this.state.messageError !== errorInitialPayment))) 
            {               
                this.props.name === 'targetCost' ? this.setState({messageError: errorTargetCost}) : this.setState({messageError: errorInitialPayment});
            }
        }

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