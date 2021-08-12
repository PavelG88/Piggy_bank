import React, { Component } from 'react';
import './InputArea.css';

class InputArea extends Component {

    state = {
        messageError: ''
    }
    
    checkValue = (event) => {
        let isError = true;
        
        if (this.props.name === 'targetName') {
            //Проверка название цели
            const error = 'Название цели 3-20 символов'
            if(!event.target.value || event.target.value.length < 3 || event.target.value.length > 20) {
                this.setState({messageError: error});
            } else {
                this.setState({messageError: ''});
                isError = false;
            }

        } else if (this.props.name === 'finishDate') {
            //Проверка даты
            const error = 'Дата цели должна быть не раньше, чем завтра'
            if (this.getYear(event.target.value) < this.getYear(this.props.today)) {
                this.setState({messageError: error});
            } else if (this.getYear(event.target.value) === this.getYear(this.props.today) && this.getMonth(event.target.value) < this.getMonth(this.props.today)) {
                this.setState({messageError: error});
            } else if (this.getYear(event.target.value) === this.getYear(this.props.today) 
                && this.getMonth(event.target.value) === this.getMonth(this.props.today) 
                && this.getDay(event.target.value) <= this.getDay(this.props.today)) {
                    this.setState({messageError: error});
            } else {
                this.setState({messageError: ''});
                isError = false;
            }

        } else if (this.props.name === 'depositInterest'){
            //Проверка введенного процента
            const error = 'Число от 0.01 до 100 (не более двух знаков после запятой)';
            if (!event.target.value || isNaN(event.target.value.replace(/,/, '.')) || event.target.value < 0.01 || event.target.value > 100) {
                //Проверка, что число от 0.01 до 100
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
                isError = false;
            }
        }

        if (isError) {
            this.props.action(this.props.name, null, true);
        } else {
            this.props.action(this.props.name, event.target.value);
        }

    }
    
    getMonth = (date) => {
        return (+date.split('-')[1]);
    }

    getYear = (date) => {
        return (+date.split('-')[0]);
    }

    getDay = (date) => {
        return (+date.split('-')[2]);
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
                        onChange={this.checkValue}
                    />
                </label>
                <div className={this.state.messageError ? "error" : "error unvisible"}>{this.state.messageError}</div>
            </div>
        );
    }
}
 
export default InputArea;