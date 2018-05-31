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
                <span className="question">{this.props.question.question}</span>
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
                        answer:
                </label>
                    <input
                        name="input"
                        type="text"
                        default="answer"
                    />
                    <button type="submit">submit</button>
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
        question: state.questions.question
    };
};

export default requiresLogin()(connect(mapStateToProps)(InputForm));