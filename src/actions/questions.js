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

export const DISPLAY_CORRECT_SUCCESS = 'DISPLAY_CORRECT_SUCCESS';
export const displayCorrectSuccess = answer => ({
    type: DISPLAY_CORRECT_SUCCESS,
    answer
});

export const DISPLAY_INCORRECT_SUCCESS = 'DISPLAY_INCORRECT_SUCCESS';
export const displayIncorrectSuccess = (answer) => ({
    type: DISPLAY_INCORRECT_SUCCESS,
    answer
})

export const FETCH_HISTORY_REQUEST = 'FETCH_HISTORY_REQUEST';
export const fetchHistoryRequest = () => ({
    type: FETCH_HISTORY_REQUEST
});

export const FETCH_HISTORY_SUCCESS = 'FETCH_HISTORY_SUCCESS';
export const fetchHistorySuccess = (history) => ({
    type: FETCH_HISTORY_SUCCESS,
    history
});

export const fetchQuestion = (userInput=3) => (dispatch, getState) => {
    dispatch(fetchQuestionRequest());
    const authToken = getState().auth.authToken;
    if (userInput === 3) {
        console.log('FETCH USER INPUT', userInput)
        return fetch(`${API_BASE_URL}/users/first`, {
            method: 'GET',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${authToken}`,
                'content-type': 'application/json'
            }
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => {
            dispatch(fetchQuestionSuccess(data))
        })
        .then(() => {
            dispatch(fetchHistoryRequest())
            return fetch(`${API_BASE_URL}/users/history`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'content-type': 'application/json'
                }
            })
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => {
            dispatch(fetchHistorySuccess(data))
        })
        .catch(err => {
            dispatch(fetchQuestionError(err));
        });
    }
    else {
    return fetch(`${API_BASE_URL}/users/next`, {
        method: 'POST',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify({userInput})
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => {
            dispatch(fetchQuestionSuccess(data))
        })
        .then(() => {
            dispatch(fetchHistoryRequest())
            return fetch(`${API_BASE_URL}/users/history`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'content-type': 'application/json'
                }
            })
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => {
            dispatch(fetchHistorySuccess(data))
        })
        .catch(err => {
            dispatch(fetchQuestionError(err));
        });
    }
};