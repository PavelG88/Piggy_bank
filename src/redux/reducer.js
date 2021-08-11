import { addNewTarget } from '../components/actions/actions';

let initialState = {
    targets: [
        {
            id: 1,
            targetName: 'Первая цель',
            targetCost: 1000,
            finishDate: '2021-09-01',
            initialPayment: 0,
            depositInterest: 3.1,
            monthPayment: 1000,
            createDate: '2021-08-07',
            lastChangeDate: '2021-08-07'
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
    }
   
    return state;
}

export default reducer;