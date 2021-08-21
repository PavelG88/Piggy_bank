import { successAdded, successEdited, successDeleted, startedConnecting, successLoading, failureConnecting } from './types';
import axios from 'axios';

//Первоначальная загрузка целей из БД
export const loadTargetsFromBD = () => {
    return dispatch => {
        dispatch(startLoading());

    axios.get(`http://localhost:3001`)
        .then(res => {
            dispatch(loadingSuccess(res.data));
        })
        .catch(err => {
            dispatch(loadingFailure(err.message));
        });
    };
};

//Удаление цели
export const deleteTarget = (id) => {
    return dispatch => {
        dispatch(startLoading());

    axios.delete(`http://localhost:3001/${id}`)
        .then(res => {
            dispatch(successDelete(id));
        })
        .catch(err => {
            dispatch(loadingFailure(err.message));
        });
    };
};

//Добавление новой цели
export const addNewTarget = (newTarget) => {
    console.log("Запустился диспатч на добавление");
    console.log(newTarget);
    return dispatch => {
        dispatch(startLoading());

    //     axios({
    //         method: 'post',
    //         // headers: {
    //         //     'Content-Type': 'application/json;charset=UTF-8',
    //         //     "Access-Control-Allow-Origin": "*"
    //         // },
    //         url: `http://localhost:3001`,
    //         params: {'Content-Type': 'application/json;charset=UTF-8'},
    //         data: JSON.stringify(newTarget)
    // })
    axios.post(`http://localhost:3001`, newTarget, { 'Content-Type': 'application/json;charset=UTF-8', "Access-Control-Allow-Origin": "*"})
        .then(res => {
            console.log(res);
            console.log(res.data);
            // dispatch(successAdd(res.data));
        })
        .catch(err => {
            dispatch(loadingFailure(err.message));
        });
    };
};

const loadingSuccess = data => ({
  type: successLoading,
  payload: {
    targets: [...data]
  }
});

const successDelete = id => ({
    type: successDeleted,
    payload: {
      targetId: id
    }
});

const successAdd = newTarget => ({
    type: successAdded,
    payload: {
        newTarget
    }
});

const startLoading = () => ({
  type: startedConnecting
});

const loadingFailure = error => ({
  type: failureConnecting,
  payload: {
    error
  }
});