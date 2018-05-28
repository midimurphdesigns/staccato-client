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
            <div className="welcome-login-container row col-12">
                <section className="title-section col-6">
                    <h3>Welcome to...</h3>
                    <h1>Staccato</h1>
                    <h3>A music theory learning app</h3>
                </section>
                <section className="login col-6">
                    <LoginForm />
                    <label>Need to create an account?</label>
                    <Link to="/register">Register</Link>
                </section>
            </div>

            <div className="row col-12">
                <section className="info-block col-3">
                    <label>Expand your music theory through...</label>
                    <h3>Space repetition!</h3>
                </section>
                <section className="info-block col-3">
                    <label>Keep track of your...</label>
                    <h3>Progress!</h3>
                </section>
                <section className="info-block col-3">
                    <label>Let our algorithm suggest to you...</label>
                    <h3>Chords, scales, and terminology!</h3>
                </section>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
