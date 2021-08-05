import React, { Component } from 'react';
import InputArea from '../InputArea/InputArea';

import './NewTarget.css';

class NewTarget extends Component {
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
            <div className="new-target">
               <form className="new-target__form-input"> 
                    <InputArea
                        id='targetName'
                        label='Название цели:'
                        name='targetName'
                        type='text'
                    />
                    <InputArea
                        id='finishDate'
                        label='Когда хочу достигнуть цели:'
                        name='finishDate'
                        type='date'
                    />
                    <InputArea
                        id='depositInterest'
                        label='Под какой процент вложу:'
                        name='depositInterest'
                        type='number'
                    />
                    

               </form>
            </div>
        );
    }
}
 
export default NewTarget;