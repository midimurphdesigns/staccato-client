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
                        <h2>A music theory learning app</h2>
                    </Message>
                </section>
                <section className="login-section col-6">
                    <Message floating className="question-card">
                        <LoginForm className="login" />
                        <div className="register-message">
                            <label className="register-link">Need to create an account? </label>
                            <Link to="/register" className="register-link">Register</Link>
                        </div>
                    </Message>
                </section>
            </div>

            <div className="info-section">
                <section className="info-block col-4">
                    <Message floating className="question-card">
                        <h3>Expand your music theory through...</h3>
                        <h2>Space repetition!</h2>
                    </Message>
                </section>

                <section className="info-block center-info-block col-4">
                    <Message floating className="question-card">
                        <h3>Keep track of your...</h3>
                        <h2>Progress!</h2>
                    </Message>
                </section>

                <section className="info-block col-4">
                    <Message floating className="question-card">
                        <h3>Let our algorithm suggest to you...</h3>
                        <h2>Chords, scales, and terminology!</h2>
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
