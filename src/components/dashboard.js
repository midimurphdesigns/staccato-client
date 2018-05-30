import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

import Input from './input';

export class Dashboard extends React.Component {

    render() {
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div>
                <div className="dashboard-protected-data">
                    Question: {this.props.question}
                </div>
                < Input />
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
        currentUser: state.auth.currentUser.id,
        question: state.questions.question
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
