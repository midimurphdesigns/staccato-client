import React from 'react';

import { connect } from 'react-redux';
import requiresLogin from './requires-login';

import { fetchQuestion } from '../actions/questions';

class InputForm extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchQuestion());
    }

    formatInput(input) {
        const newInput = input.split('').filter(el => el !=='.' && el !==' ' && el !=="'" && el !==',').join('').toLowerCase();
        return newInput;
    }

    render() {

        return (
            <div className="container">
                <div className="answer-status">
                    <label className="q-correct">Questions correct: {this.props.currentUser.qCorrect}</label>
                    <label className="q-total">Questions answered: {this.props.currentUser.qTotal}</label>
                </div>
                <label className="question">{this.props.question.question}</label>
                <form className="form-input" onSubmit={(e) => {
                    e.preventDefault();
                    //dispatch to backend...
                    const userInput = this.formatInput(e.target.input.value);
                    this.props.dispatch(fetchQuestion(false));
                    // match answer with user input
                    if (this.props.question.answer === userInput) {
                        this.props.dispatch(fetchQuestion(true));
                    }
                }}>
                    <label htmlFor="input">
                </label>
                    <input
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
        currentUser: state.auth.currentUser
    };
};

export default requiresLogin()(connect(mapStateToProps)(InputForm));