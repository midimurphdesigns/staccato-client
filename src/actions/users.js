import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const registerUser = user => dispatch => {
    return fetch(`${API_BASE_URL}/auth/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .catch(err => {
            const { reason, message, location } = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};

export const fetchNextQuestion = (userId) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    dispatch(fetchNextQuestionRequest());
    return fetch(`${API_BASE_URL}/users/${userId}/next`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({ data }) => dispatch(fetchNextQuestionSuccess(data)))
        .catch(err => {
            dispatch(fetchNextQuestionError(err));
        });
};

function fetchNextQuestionRequest() {
    return {
        type: "FETCH_NEXT_QUESTION_REQUEST",
    };
}

function fetchNextQuestionSuccess(data) {
    return {
        type: "FETCH_NEXT_QUESTION_SUCCESS",
        payload: data
    };
}

function fetchNextQuestionError(err) {
    return {
        type: "FETCH_NEXT_QUESTION_ERROR",
        payload: err
    };
}
