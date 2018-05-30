import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const fetchQuestionSuccess = question => ({
    type: FETCH_QUESTION_SUCCESS,
    question
});

export const FETCH_QUESTION_ERROR = 'FETCH_QUESTION_ERROR';
export const fetchQuestionError = error => ({
    type: FETCH_QUESTION_ERROR,
    error
});

export const FETCH_QUESTION_REQUEST = 'FETCH_QUESTION_REQUEST';
export const fetchQuestionRequest = question => ({
    type: FETCH_QUESTION_REQUEST
});


export const fetchQuestion = () => (dispatch, getState) => {
    dispatch(fetchQuestionRequest());
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/users/next`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => {
            console.log('data --->', data)
            dispatch(fetchQuestionSuccess(data))
        })
        .catch(err => {
            dispatch(fetchQuestionError(err));
        });
};


// ===================


// export const fetchNextQuestion = (userId) => (dispatch, getState) => {
//     const authToken = getState().auth.authToken;
//     dispatch(fetchNextQuestionRequest());
//     return fetch(`${API_BASE_URL}/users/${userId}/next`, {
//         method: 'GET',
//         headers: {
//             // Provide our auth token as credentials
//             Authorization: `Bearer ${authToken}`
//         }
//     })
//         .then(res => normalizeResponseErrors(res))
//         .then(res => res.json())
//         .then(({ data }) => dispatch(fetchNextQuestionSuccess(data)))
//         .catch(err => {
//             dispatch(fetchNextQuestionError(err));
//         });
// };

// function fetchNextQuestionRequest() {
//     return {
//         type: "FETCH_NEXT_QUESTION_REQUEST",
//     };
// }

// function fetchNextQuestionSuccess(data) {
//     return {
//         type: "FETCH_NEXT_QUESTION_SUCCESS",
//         payload: data
//     };
// }

// function fetchNextQuestionError(err) {
//     return {
//         type: "FETCH_NEXT_QUESTION_ERROR",
//         payload: err
//     };
// }
