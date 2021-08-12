
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
        },
        {
            id: 2,
            targetName: 'Первая цель',
            targetCost: 1000,
            finishDate: '2021-09-01',
            initialPayment: 0,
            depositInterest: 3.1,
            monthPayment: 10000,
            createDate: '2021-08-07',
            lastChangeDate: '2021-08-07'
        }
    ]
};

/**
 * state = initialState - установка значения по умолчанию. Когда ничего не пердается
 */
function reducer(state = initialState, action) {
    // if(action.type === "DELETE_TARGET") {
    //    let result = state.filter((item, i) => {
    //     return item[i].id
    // })
    // console.log(result) 
    // }
    
    if(action.type === "DELETE_TARGET") {
        // let target = state.targets.find(target => target.id === action.id);
        // console.log(target)

        let updateState = {...state};
       let updatedTarget = updateState.targets.filter((target) => {
           return target.id !== action.payload
       }) 
       updateState.targets = [...updatedTarget];
        return updateState;

        // let targetsDel = [];
        // let newTargets = {...state};
        // newTargets = targetsDel

        // return newTargets;
    }

    return state;
}
 



export default reducer;