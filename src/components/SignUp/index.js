import React, { Component } from 'react';
import {Card, ItemCenter} from "../App/style";
import {Link, withRouter} from "react-router-dom";
import {compose} from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles'

const SignUpPage = () => (
    <ItemCenter>
        <Card><SignUpForm /></Card>
    </ItemCenter>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isAdmin: false,
    error: null,
}

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
    An Account with an Email address to
    this social account already exists. Try to login from
    this account instead and associate your social accounts on
    your personal account page
`;

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { username, email, passwordOne, isAdmin } = this.state;
        const roles = {};

        if (isAdmin) {
            roles[ROLES.ADMIN] = ROLES.ADMIN;
        }

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // create a user in firebase realtime database
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                        roles,
                    });
            })
            .then(() => {
                return this.props.firebase.doSendEmailVerification();
            })
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }

                this.setState({error});
            });

        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onChangeCheckbox = event => {
        this.setState({[event.target.name]: event.target.checked});
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            isAdmin,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';

        return (
            <form onSubmit={this.onSubmit}>
                <h1>Sign Up</h1>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control input-lg"
                        value={username}
                        onChange={this.onChange}
                        placeholder="Full Name"
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        className="form-control input-lg"
                        value={email}
                        onChange={this.onChange}
                        placeholder="Email Address"
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="passwordOne"
                        className="form-control input-lg"
                        value={passwordOne}
                        onChange={this.onChange}
                        placeholder="Password"
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="passwordTwo"
                        className="form-control input-lg"
                        value={passwordTwo}
                        onChange={this.onChange}
                        placeholder="Confirm Password"
                    />
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <label className="form-check-label" htmlFor="gridCheck">Admin:
                            <span className="input-group-addon">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="gridCheck"
                                    name="isAdmin"
                                    checked={isAdmin} onChange={this.onChangeCheckbox}
                                />
                            </span>
                        </label>
                    </div>
                </div>
                <button disabled={isInvalid} type="submit" className="btn btn-lg btn-primary btn-block">Sign Up</button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }

}

const SignUpLink = () => (
    <p className="text-right">
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
