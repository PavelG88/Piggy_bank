import {addNewTarget, editTarget, successDeleted, addTargetsFromBD, startedConnecting, successLoading, failureConnecting  } from '../components/actions/types';

let initialState = {
    targets: [],
    loading: false,
    error: null,
    nextId: 3
};

/**
 * state = initialState - установка значения по умолчанию. Когда ничего не пердается
 */

function reducer(state = initialState, action) {
    if (action.type === successLoading) {
        //Заполнение глобального хранилища данными из БД
        let updateState = {...state};
        updateState.targets = [...action.payload.targets];
        console.log(updateState);
        return updateState;

    } else if (action.type === startedConnecting) {
        //Загрузка данных из БД
        let updateState = {...state};
        updateState.loading = true;
        return updateState;

    } else if (action.type === failureConnecting) {
        //Ошибка загрузки данных из БД
        let updateState = {...state};
        updateState.loading = false;
        updateState.error = action.payload;
        return updateState;

    } else if (action.type === addNewTarget) {
        //Добавление новой цели
        action.payload.id = state.nextId;
        let updateState = {...state};
        updateState.targets = [...state.targets, action.payload];
        updateState.nextId += 1;
        console.log(updateState);
        return updateState;
    
    } else if(action.type === successDeleted) {
        //Удаление цели по id
        let updateState = {...state};
        let updatedTarget = updateState.targets.filter((target) => {
            return target.id !== action.payload.targetId
        }) 
        updateState.targets = [...updatedTarget];
        return updateState;

    } else if (action.type === editTarget) {
        //Обновление существующей цели по id
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