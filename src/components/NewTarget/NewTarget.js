import React, { Component } from 'react';
import InputArea from '../InputArea/InputArea';
import InputMoney from '../InputMoney/InputMoney';

import './NewTarget.css';

class NewTarget extends Component {
    state = {
        targetName: null,
        targetCost: null,
        finishDate: null,
        initialPayment: null,
        depositInterest: null,
        monthPayment: null
    }
    
    render() { 
        return (
            <div className="new-target">
               <form className="new-target__form-input"> 
                    <InputArea
                        id='targetName'
                        label='Название цели:'
                        name='targetName'
                        type='text'
                    />
                    <InputMoney
                        id='targetCost'
                        label='Сколько нужно на цель:'
                        name='targetCost'
                        type='number'
                    />
                    <InputArea
                        id='finishDate'
                        label='Когда хочу достигнуть цели:'
                        name='finishDate'
                        type='date'
                    />
                    <InputMoney
                        id='initialPayment'
                        label='Сколько готов отдать сейчас:'
                        name='initialPayment'
                        type='number'
                    />
                    <InputArea
                        id='depositInterest'
                        label='Под какой процент вложу:'
                        name='depositInterest'
                        type='number'
                    />
                    <InputMoney
                        id='monthPayment'
                        label='Сколько нужно отдавать в месяц:'
                        name='monthPayment'
                        type='number'
                    />

               </form>
            </div>
        );
    }
}
 
export default NewTarget;