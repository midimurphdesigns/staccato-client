import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

import { Message } from 'semantic-ui-react'
import InputForm from './InputForm'
import './dashboard.css'

export class Dashboard extends React.Component {
    componentDidMount() {
    }

    render() {
        console.log('props', this.props);
        return (
            <div className="dashboard row">
<<<<<<< HEAD
=======
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div>
>>>>>>> a9378c4e7279c3919504367e3b5625e5424de718
                <div className="question-answer">
                    <Message
                        floating
                        className="question-card"
<<<<<<< HEAD
                    >
                        <InputForm />
                    </Message>

=======
                        // content={this.props.question.question}
                    >
                    <InputForm />
                    </Message>
                    
>>>>>>> a9378c4e7279c3919504367e3b5625e5424de718
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    console.log('current user --->', currentUser)
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        qList: state.auth.currentUser.qList,
        currentUser: state.auth.currentUser.id,
        question: state.questions.question
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
