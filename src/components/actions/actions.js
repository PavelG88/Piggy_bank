import { addNewTarget, editTarget, successDeleted, addTargetsFromBD, startedConnecting, successLoading, failureConnecting  } from './types';
import axios from 'axios';

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

// export const addNewTarget = (data) => {
//     return dispatch => {
//         dispatch(startLoading());

//     axios.post(`http://localhost:3001`)
//         .then(res => {
//             dispatch(successDelete(id));
//         })
//         .catch(err => {
//             dispatch(loadingFailure(err.message));
//         });
//     };
// };

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
  

const startLoading = () => ({
  type: startedConnecting
});

const loadingFailure = error => ({
  type: failureConnecting,
  payload: {
    error
  }
});