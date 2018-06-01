import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import './landing-page.css'
import LoginForm from './login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="home">
            <div className="bg"></div>
            <div className="welcome-section row col-12">
                <section className="title-section col-6">
                    <h3>Welcome to...</h3>
                    <h1 className="title">Staccato</h1>
                    <h3>A music theory learning app</h3>
                </section>
                <section className="login-section col-6">
                    <LoginForm className="login" />
                    <div className="register-message">
                        <label>Need to create an account? </label>
                        <Link to="/register">Register</Link>
                    </div>
                </section>
            </div>

            <div className="info-section">
                <section className="info-block col-4">
                    <h4>Expand your music theory through...</h4>
                    <h3>Space repetition!</h3>
                </section>
                <section className="info-block center-info-block col-4">
                    <h4>Keep track of your...</h4>
                    <h3>Progress!</h3>
                </section>
                <section className="info-block col-4">
                    <h4>Let our algorithm suggest to you...</h4>
                    <h3>Chords, scales, and terminology!</h3>
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
