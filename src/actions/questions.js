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

export const fetchQuestion = (userInput) => (dispatch, getState) => {
    dispatch(fetchQuestionRequest());
    const authToken = getState().auth.authToken;
    console.log('FETCH USER INPUT', userInput)
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
        .catch(err => {
            dispatch(fetchQuestionError(err));
        });
};