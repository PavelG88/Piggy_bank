import React, { Component } from 'react';
import InputArea from '../InputArea/InputArea';
import InputMoney from '../InputMoney/InputMoney';
import {connect} from 'react-redux';
import { addNewTarget, editTarget } from '../actions/actions';
import {useHistory} from 'react-router-dom'


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

// function Go() {
//     const h = useHistory();
//     h.push('/mytargets');
// }

class NewTarget extends Component {
    state = {
        id: null,
        targetName: null,
        targetCost: null,
        finishDate: null,
        initialPayment: null,
        depositInterest: null,
        monthPayment: null,
        accumulatedMoney: null,
        fieldsWithError: ['targetName', 'targetCost', 'finishDate', 'depositInterest']
    }
    
    changeState = (inputName, data, isError = false) => {

        if (isError) {
            //Проверяем есть ли поле уже в полях с ошибкой
            let isFieldInFieldsWithError = this.state.fieldsWithError.find((item) => {
                return item === inputName;
            });

            if (!isFieldInFieldsWithError) {
                const newFielsWithError = [...this.state.fieldsWithError, inputName];
                this.setState({ [inputName]: data, fieldsWithError: newFielsWithError }, () => {
                    this.calculate();
                });
            } else {
                this.setState({ [inputName]: data }, () => {
                    this.calculate();
                });
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
        let isErrors =  true;
        if (this.state.fieldsWithError.length === 0 || (this.state.fieldsWithError.length === 1 && this.state.fieldsWithError[0] === 'targetName')) {
            isErrors = false;
        }

        if (!isErrors) {
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

            this.setState({ monthPayment: payment, initialPayment: firstPayment, accumulatedMoney: firstPayment});
        } else {
            this.setState({ monthPayment: 0 });
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
        if (newTarget.id) {
            this.props.editTarget(newTarget);
        } else {
            this.props.addNewTarget(newTarget);
        }
        // window.location.href = '/mytargets';
        // Go();
    }

    updateState = (target) => {
        target.fieldsWithError = [];
        this.setState({ ...target });
    }

    render() { 
        if (this.props.location.state && !this.state.id) {
            this.updateState(this.props.location.state.target);
        }
        
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
                        value={this.state.targetName}
                    />
                    <InputMoney
                        id='targetCost'
                        label='Сколько нужно на цель:'
                        name='targetCost'
                        type='text'
                        action={this.changeState}
                        value={this.state.targetCost}
                    />
                    <InputArea
                        id='finishDate'
                        label='Когда хочу достигнуть цель:'
                        name='finishDate'
                        type='date'
                        today={today}
                        value={this.state.finishDate}
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
                        value={this.state.depositInterest}
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
                    <button type="submit" className="new-target__button" disabled={this.state.fieldsWithError.length === 0  ? false : true}>СОХРАНИТЬ</button>
                    {/* <button class="btn" id="btn-start">Start </button> */}
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        targets: state.targets
    };
};

const mapDispatchToProps = dispatch => ({
    addNewTarget: (newTarget) => dispatch({
        type: addNewTarget,
        payload: newTarget
    }),
    editTarget: (newTarget) => dispatch({
        type: editTarget,
        payload: newTarget
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTarget);