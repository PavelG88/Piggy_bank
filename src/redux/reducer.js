import { addNewTarget, editTarget, deleteTarget } from '../components/actions/actions';
const mysql = require('mysql');
// const express = require('express');
// const app = express();

let initialState = {
    targets: [
        {
            id: 1,
            targetName: 'Первая цель',
            targetCost: 1000,
            finishDate: '2021-09-01',
            initialPayment: 500,
            depositInterest: 3.1,
            monthPayment: 500,
            createDate: '2021-08-07',
            lastChangeDate: '2021-08-07',
            accumulatedMoney: 500
        },
        {
            id: 2,
            targetName: 'Вторая цель',
            targetCost: 15000,
            finishDate: '2021-09-01',
            initialPayment: 15000,
            depositInterest: 0.01,
            monthPayment: 0,
            createDate: '2021-08-07',
            lastChangeDate: '2021-08-07',
            accumulatedMoney: 15000
        }
    ],
    nextId: 3
};

/**
 * state = initialState - установка значения по умолчанию. Когда ничего не пердается
 */

 function getInitialState() {
    const connection = mysql.createConnection ({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'Olga240584',
        database: 'targets_users'
    });

    connection.connect((error) => {
        if (!error) {
            console.log("Мы подключены к БД")
        }
    })

    // app.get('/targets_users/:id', (request, response) => {
    //     console.log(request.params.id)
        
    //     connection.query(`SELECT * FROM table_target WHERE id = ${request.params.id};`, (err, data) => {
    //         // 
    //           if (err || data.length === 0) {
    //             response.status(400).json("not");
    //             return;
    //           }
    
    //           console.log(data)
    //           response.status(200).json(data)
    //     })     
    // })

    
}


function reducer(state = initialState, action) {
    if (action.type === addNewTarget) {
        //Добавление новой цели
        action.payload.id = state.nextId;
        let updateState = {...state};
        updateState.targets = [...state.targets, action.payload];
        updateState.nextId += 1;
        console.log(updateState);
        return updateState;
    
    } else if(action.type === deleteTarget) {

        let updateState = {...state};
       let updatedTarget = updateState.targets.filter((target) => {
           return target.id !== action.payload
       }) 
       updateState.targets = [...updatedTarget];
        return updateState;

    } else if (action.type === editTarget) {
        //Обновление существующей цели
        let updateState = {...state};
        let index;
        updateState.targets.forEach((target, iter) => {
            if (target.id === action.payload.id) {
                index = iter;
            }
        });
        updateState.targets[index] = {...action.payload};
        return updateState;
    }

    return state;
}
 



export default reducer;