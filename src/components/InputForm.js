import React from 'react';

import { connect } from 'react-redux';
import requiresLogin from './requires-login';

import { fetchQuestion, displayCorrectSuccess, displayIncorrectSuccess } from '../actions/questions';

class InputForm extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchQuestion());
    }

    formatInput(input) {
        const newInput = input.split('').filter(el => el !== '.' && el !== ' ' && el !== "'" && el !== ',').join('').toLowerCase();
        return newInput;
    }

    render() {
        return (
            <div className="container">
                <div className="answer-status">
                    <label className="q-correct">Questions correct: {this.props.history.qCorrect}</label>
                    <label className="q-total">Questions answered: {this.props.history.qTotal}</label>
                </div>
                <label className="question">{this.props.question.question}</label>
                <form className="form-input" onSubmit={(e) => {
                    e.preventDefault();
                    const userInput = this.formatInput(e.target.input.value);
                    if (this.props.question.answer === userInput) {
                        this.props.dispatch(displayCorrectSuccess(this.props.question.answer));
                    }
                    else {
                        this.props.dispatch(displayIncorrectSuccess(this.props.question.answer));
                    }
                }}>
                    <label htmlFor="input">
                    </label>
                    <input
                        className="field"
                        name="input"
                        type="text"
                        default="answer"
                        placeholder="Answer..."
                        className="answer"
                    />
                    <button type="submit" className="submit-button">submit</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        qList: state.auth.currentUser.qList,
        question: state.questions.question,
        history: state.questions.history,
        currentUser: state.auth.currentUser
    };
};

export default requiresLogin()(connect(mapStateToProps)(InputForm));