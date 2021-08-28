import { successAdded, successEdited, successDeleted, startedConnecting, successLoading, failureConnecting } from './types';
import axios from "axios";

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
    return dispatch => {
        dispatch(startLoading());

        axios.post(`http://localhost:3001`, newTarget)
            .then(res => {
                newTarget.id = res.data;
                dispatch(successAdd(newTarget));
            })
            .catch(err => {
                dispatch(loadingFailure(err.message));
            });
    };
};

export const editTarget = (newTarget) => {
    return dispatch => {
        dispatch(startLoading());
        axios.put(`http://localhost:3001`, newTarget)
            .then(res => {
                if (res.data.changedRows === 1) {
                    dispatch(successEdit(newTarget));  
                } else {
                    
                    dispatch(loadingFailure("Строка не найдена"));
                }
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
        ...newTarget
    }
});

const successEdit = newTarget => ({
    type: successEdited,
    payload: {
        ...newTarget
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