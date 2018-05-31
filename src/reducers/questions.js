import {
    FETCH_QUESTION_SUCCESS,
    FETCH_QUESTION_ERROR,
    FETCH_QUESTION_REQUEST,
    FETCH_HISTORY_REQUEST,
    FETCH_HISTORY_SUCCESS,
    DISPLAY_CORRECT_SUCCESS,
    DISPLAY_INCORRECT_SUCCESS
} from '../actions/questions';

const initialState = {
    question: '',
    loading: false,
    message: '',
    history: {qTotal: 0, qCorrect: 0}
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_QUESTION_SUCCESS) {
        console.log('action --->', action)
        return Object.assign({}, state, {
            question: action.question,
            error: null,
            loading: false
        });
    } else if (action.type === FETCH_QUESTION_ERROR) {
        return Object.assign({}, state, {
            error: action.error,
            loading: false
        });
    }
    else if (action.type === FETCH_QUESTION_REQUEST) {
        return Object.assign({}, state, {
            loading: true
        });
    }
    else if (action.type === FETCH_HISTORY_REQUEST) {
        return Object.assign({}, state, {
            loading: true
        });
    }
    else if (action.type === FETCH_HISTORY_SUCCESS) {
        return Object.assign({}, state, {
            loading: false,
            history: action.history
        });
    }
    else if (action.type === DISPLAY_CORRECT_SUCCESS) {
        return Object.assign({}, state, {
            loading: false,
            answer: action.answer,
            message: 'Correct!'
        });
    }
    else if (action.type === DISPLAY_INCORRECT_SUCCESS) {
        return Object.assign({}, state, {
            loading: false,
            answer: action.answer,
            message: 'Sorry, try again'
        });
    }
    return state;
}
