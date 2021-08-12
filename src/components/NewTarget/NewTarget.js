import React, { Component } from 'react';
import InputArea from '../InputArea/InputArea';
import InputMoney from '../InputMoney/InputMoney';
import {connect} from 'react-redux';
import { addNewTarget } from '../actions/actions';

import './NewTarget.css';

const today = formatDate();

function formatDate() {
    let date = new Date(),
        month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

class NewTarget extends Component {
    state = {
        id: null,
        targetName: null,
        targetCost: null,
        finishDate: null,
        initialPayment: null,
        depositInterest: null,
        monthPayment: null,
        fieldsWithError: ['targetName', 'targetCost', 'finishDate', 'depositInterest']
    }
    
    changeState = (inputName, data, isError = false) => {

        if (isError) {
            let isFieldInState = this.state.fieldsWithError.forEach((item) => {
                if (item === inputName) {
                    return true;
                } else {
                    return false;
                }
            });

            if (!isFieldInState) {
                const newFielsWithError = [...this.state.fieldsWithError, inputName];
                this.setState({ [inputName]: data, fieldsWithError: newFielsWithError });
            } else {
                this.setState({ [inputName]: data });
            }

        } else {
            const newFielsWithError = this.state.fieldsWithError.filter((item) => {
                return item !== inputName;
            })
            this.setState({ [inputName]: data, fieldsWithError: [...newFielsWithError] }, () => {
                this.calculate();
            });
        }
    }
    /*Вычисление платежа */
    calculate = () => {
        if (this.state.targetCost && this.state.finishDate && this.state.depositInterest && this.state.fieldsWithError.length === 0) {
            let depositInterestByMonth = (this.state.depositInterest / 12) / 100;
            let monthsToTarget = (this.getYear(this.state.finishDate) - this.getYear(today)) * 12 + this.getMonth(this.state.finishDate) - this.getMonth(today);
            let firstPayment = this.state.initialPayment ? this.state.initialPayment : 0;
            let payment;

            if (this.getYear(this.state.finishDate) === this.getYear(today) && this.getMonth(this.state.finishDate) === this.getMonth(today)) {
                payment = this.state.targetCost - firstPayment;
            } else {
                payment = (this.state.targetCost - (firstPayment * (1 + depositInterestByMonth))) * (depositInterestByMonth / ((1 + depositInterestByMonth) ** monthsToTarget - 1));
                payment = payment <= 0 ? 0 : Math.round(payment * 100) / 100;
            }

            this.setState({ monthPayment: payment, initialPayment: firstPayment });
        } else {
            this.setState({ monthPayment: null });
        };
    }

    getMonth = (date) => {
        return (+date.split('-')[1]);
    }

    getYear = (date) => {
        return (+date.split('-')[0]);
    }

    addNewTarget = (event) => {
        event.preventDefault();
        let newTarget = {...this.state};
        delete newTarget.fieldsWithError;
        this.props.addNewTarget(newTarget);
    }

    render() { 
        return (
            <div className="new-target">
                <h2 className="new-target__title">Введите данные по цели</h2>
                <form className="new-target__form-input" onSubmit={this.addNewTarget}> 
                    <InputArea
                        id='targetName'
                        label='Название цели:'
                        name='targetName'
                        type='text'
                        action={this.changeState}
                    />
                    <InputMoney
                        id='targetCost'
                        label='Сколько нужно на цель:'
                        name='targetCost'
                        type='text'
                        action={this.changeState}
                        value={null}
                    />
                    <InputArea
                        id='finishDate'
                        label='Когда хочу достигнуть цель:'
                        name='finishDate'
                        type='date'
                        today={today}
                        action={this.changeState}
                    />
                    <InputMoney
                        id='initialPayment'
                        label='Сколько готов отдать сейчас:'
                        name='initialPayment'
                        type='text'
                        action={this.changeState}
                        value={this.state.initialPayment}
                        targetCost={this.state.targetCost}
                    />
                    <InputArea
                        id='depositInterest'
                        label='Под какой процент вложу:'
                        name='depositInterest'
                        type='text'
                        action={this.changeState}
                    />
                    <InputMoney
                        id='monthPayment'
                        label='Сколько нужно отдавать в месяц:'
                        name='monthPayment'
                        type='text'
                        value={this.state.monthPayment}
                        action={this.changeState}
                        disabled={true}
                    />
                    <button type="submit" className="new-target__button" disabled={this.state.fieldsWithError.length === 0  ? false : true}>СОЗДАТЬ</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return 
};

const mapDispatchToProps = dispatch => ({
    addNewTarget: (newTarget) => dispatch({
        type: addNewTarget,
        payload: newTarget
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTarget);