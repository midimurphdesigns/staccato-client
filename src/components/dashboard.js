import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

import InputForm from './InputForm'

export class Dashboard extends React.Component {
    componentDidMount() {
    }

    render() {
        console.log('props', this.props);
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div>
                <div className="dashboard-protected-data">
                    <InputForm />
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
