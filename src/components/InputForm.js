import React from 'react';

import { connect } from 'react-redux';
import requiresLogin from './requires-login';

import { fetchQuestion } from '../actions/questions';

class InputForm extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchQuestion());
    }

    render() {

        return (
            <div className="container">
                <span className="question">{this.props.question.question}</span>
                <form className="form-input" onSubmit={(e) => {
                    e.preventDefault();
                    //dispatch to backend...
                    this.props.dispatch(fetchQuestion(e.target.input.value));
                    console.log(e.target.input.value);
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
        question: state.auth.currentUser.questions[0]
    };
};

export default requiresLogin()(connect(mapStateToProps)(InputForm));