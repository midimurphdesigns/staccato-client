import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import './landing-page.css'
import { Message } from 'semantic-ui-react';
import LoginForm from './login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="home">
            <div className="bg2"></div>
            <div className="welcome-section row col-12">

                <section className="title-section col-6">
                    <Message floating className="question-card">
                        <h3>Welcome to...</h3>
                        <h1 className="title">Staccato</h1>
                        <h3>A music theory learning app</h3>
                    </Message>
                </section>
                <section className="login-section col-6">
                    <Message floating className="question-card">
                        <LoginForm className="login" />
                        <div className="register-message">
                            <label>Need to create an account? </label>
                            <Link to="/register">Register</Link>
                        </div>
                    </Message>
                </section>
            </div>

            <div className="info-section">
                <section className="info-block col-4">
                    <Message floating className="question-card">
                        <h4>Expand your music theory through...</h4>
                        <h3>Space repetition!</h3>
                    </Message>
                </section>

                <section className="info-block center-info-block col-4">
                    <Message floating className="question-card">
                        <h4>Keep track of your...</h4>
                        <h3>Progress!</h3>
                    </Message>
                </section>

                <section className="info-block col-4">
                    <Message floating className="question-card">
                        <h4>Let our algorithm suggest to you...</h4>
                        <h3>Chords, scales, and terminology!</h3>
                    </Message>
                </section>
            </div>
            {/* <div className="color"></div> */}
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
