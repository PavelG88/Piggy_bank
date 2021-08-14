import { addNewTarget } from '../components/actions/actions';

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
    nextId: 2
};

/**
 * state = initialState - установка значения по умолчанию. Когда ничего не пердается
 */
function reducer(state = initialState, action) {
    if (action.type === addNewTarget) {
        action.payload.id = state.nextId;
        let updateState = {...state};
        updateState.targets = [...state.targets, action.payload];
        updateState.nextId += 1;
        console.log(updateState);
        return updateState;
    
    } else if(action.type === "DELETE_TARGET") {

        let updateState = {...state};
       let updatedTarget = updateState.targets.filter((target) => {
           return target.id !== action.payload
       }) 
       updateState.targets = [...updatedTarget];
        return updateState;
    }

    return state;
}
 



export default reducer;