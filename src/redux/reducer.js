
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
//     function deleteTarget(elem, id) {
//     initialState.filter((elem) => {
//         if(elem !== initialState.targets.id)
//         return {...initialState};
//     }) 
// }
    return state;
}
 



export default reducer;