import {
    FETCH_QUESTION_SUCCESS,
    FETCH_QUESTION_ERROR,
    FETCH_QUESTION_REQUEST
} from '../actions/questions';

const initialState = {
    question: '',
    loading: false,
    message: ''
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
    return state;
}
