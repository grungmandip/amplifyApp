import React, { Component } from 'react';
import {Card, ItemCenter} from "../App/style";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {Link, withRouter} from "react-router-dom";
import {compose} from 'recompose';

import {SignUpLink} from '../SignUp';
import {PasswordForgetLink} from "../PasswordForget";
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
    <Card>
        <SignInForm />
        <SignInGoogle />
        <SignInFacebook />
        <PasswordForgetLink />
        <SignUpLink />
    </Card>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
}

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
    An Account with an Email address to
    this social account already exists. Try to login from
    this account instead and associate your social accounts on
    your personal account page
`;

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({error});
            });

        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        placeholder="Email Address"
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        placeholder="Password"
                    />
                </div>
                <button disabled={isInvalid} type="submit" className="btn btn-primary btn-block">Sign In</button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

class SignInGoogleBase extends Component {
    constructor(props) {
        super(props);

        this.state = {error: null};
    }

    onSubmit = event => {
        this.props.firebase.doSignInWithGoogle()
            .then(socialAuthUser => {
                // here create a user in Firebase Realtime database too
                return this.props.firebase
                    .user(socialAuthUser.user.uid)
                    .set({
                        username: socialAuthUser.user.displayName,
                        email: socialAuthUser.user.email,
                        roles: {},
                    });
            })
            .then(() => {
                this.setState({error: null});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }

                this.setState({error});
            });

        event.preventDefault();
    };

    render() {
        const {error} = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <ItemCenter><button type="submit" className="btn btn-sm btn-google border-dark mt-3">
                    <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="google"/>
                    SignIn With Google
                </button></ItemCenter>

                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

class SignInFacebookBase extends Component {
    constructor(props) {
        super(props);

        this.state = {error: null};
    }

    onSubmit = event => {
        this.props.firebase.doSignInWithFacebook()
            .then(socialAuthUser => {
                // here create a user in Firebase Realtime database too
                return this.props.firebase
                    .user(socialAuthUser.user.uid)
                    .set({
                        username: socialAuthUser.additionalUserInfo.profile.name,
                        email: socialAuthUser.additionalUserInfo.profile.email,
                        roles: {},
                    });
            })
            .then(() => {
                this.setState({error: null});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }

                this.setState({error});
            });

        event.preventDefault();
    };

    render() {
        const {error} = this.state;

        return (
            <form onSubmit={this.onSubmit}>
            <ItemCenter>
                <button type="submit" className="btn btn-sm btn-facebook border-dark mt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-facebook" viewBox="0 0 16 16">
                        <path
                            d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                    </svg>
                    SignIn with Facebook
                </button>
            </ItemCenter>

                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

const SignInGoogle = compose(
    withRouter,
    withFirebase,
)(SignInGoogleBase);

const SignInFacebook = compose(
    withRouter,
    withFirebase,
)(SignInFacebookBase);

export default SignInPage;

export { SignInForm, SignInGoogle, SignInFacebook };
