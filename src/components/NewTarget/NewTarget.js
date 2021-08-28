import React, { Component } from 'react';
import InputArea from '../InputArea/InputArea';
import InputMoney from '../InputMoney/InputMoney';
import {connect} from 'react-redux';
import { addNewTarget,  editTarget} from '../actions/actions';
import {Redirect} from 'react-router-dom';
import store from "../../redux/store";

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
        accumulatedMoney: null,
        fieldsWithError: ['targetName', 'targetCost', 'finishDate', 'depositInterest'],
        createDate: today,
        isSaved: false,
        isCorrectInitialPayment: true
    }
    
    changeState = (inputName, data, isError = false) => {

        //Проверка полей сумма цели и первоначальный взнос на взаимную корректность
        if (inputName === 'targetCost' || inputName === 'initialPayment') {
            this.checkInitialPayment(inputName, data);
        }

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
            //Удаляем поле из ошибок
            const newFielsWithError = this.state.fieldsWithError.filter((item) => {
                return item !== inputName;
            });

            //Вносим изменения в локальный State и пересчитываем платеж
            this.setState({ [inputName]: data, fieldsWithError: [...newFielsWithError] }, () => {
                this.calculate();
            });
        }
    }
    /*Вычисление платежа */
    calculate = () => {
        let isErrors =  true;
        if ((this.state.fieldsWithError.length === 0 
            || (this.state.fieldsWithError.length === 1 && this.state.fieldsWithError[0] === 'targetName')) 
            && this.state.isCorrectInitialPayment) 
        {
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

            this.setState({ monthPayment: payment, accumulatedMoney: firstPayment});
        } else {
            this.setState({ monthPayment: 0 });
        };
    }

    /*Проверяем первоначальный взнос*/
    checkInitialPayment = (inputName, data) => {
        let checkedCorrectInitialPayment = false;
        
        if (inputName === 'targetCost' && (this.state.initialPayment <= data || !this.state.initialPayment)) {
            //Если введена сумма цели, проверяем, что она больше или равна первоначальному взносу или что первоначальный взнос не заполнен
            checkedCorrectInitialPayment = true;           
        }
        
        if (inputName === 'initialPayment' && (!data || data <= this.state.targetCost)) {
            //Ессли введен первоначальный взнос, проверяем, что он меньше или равен цели или что он нулевой
            checkedCorrectInitialPayment = true;
        }

        if (checkedCorrectInitialPayment !== this.state.isCorrectInitialPayment) {
            this.setState({ isCorrectInitialPayment: checkedCorrectInitialPayment});
        }
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
        delete newTarget.isSaved;
        if (newTarget.id) {
            this.props.editTarget(newTarget);
        } else {
            this.props.addNewTarget(newTarget);
        }
        this.setState({ isSaved: true});
    }

    updateState = (target) => {
        target.fieldsWithError = [];
        target.finishDate = target.finishDate.split("T")[0]
        this.setState({ ...target });
    }

    render() { 
        if (this.props.location.state && !this.state.id) {
            this.updateState(this.props.location.state.target);
        }

        if (this.state.isSaved && !this.props.loading) {
            return <Redirect to='/mytargets'/>
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
                        isCorrectInitialPayment={this.state.isCorrectInitialPayment}
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
                        isCorrectInitialPayment={this.state.isCorrectInitialPayment}
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
                    <button 
                        type="submit" 
                        className="new-target__button" 
                        disabled={(this.state.fieldsWithError.length === 0 && this.state.isCorrectInitialPayment) ? false : true}
                    >
                        СОХРАНИТЬ
                    </button>
                    {/* <button class="btn" id="btn-start">Start </button> */}
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading
    };
};

const mapDispatchToProps = dispatch => ({
    addNewTarget: (newTarget) => dispatch(addNewTarget(newTarget)),
    editTarget: (newTarget) => dispatch(editTarget(newTarget))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTarget);