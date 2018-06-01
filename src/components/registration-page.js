import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { Message } from 'semantic-ui-react';

import RegistrationForm from './registration-form';

export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className="registration">
            <div className="registration-card">
                <Message floating>
                    <h2 className="registration-title">Register for Staccato</h2>
                    <RegistrationForm className="registration-form" />
                    <span>Already have an account? </span><Link to="/" className="login-link">Login</Link>
                </Message>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
