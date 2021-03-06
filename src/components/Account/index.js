import React, {Component} from 'react';
import {Card, H4, ItemCenter, ItemRight, ItemLeft} from "../App/style";
import {compose} from "recompose";

import {PasswordForgetForm} from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import {AuthUserContext, withAuthorization, withEmailVerification} from "../Session";
import {withFirebase} from "../Firebase";
import MediaQuery from "react-responsive/src";

const SIGN_IN_METHODS = [
    {
        id: 'password',
        provider: null,
    },
    {
        id: 'google.com',
        provider: 'googleProvider',
    },
    {
        id: 'facebook.com',
        provider: 'facebookProvider',
    },
];

class  LoginManagementBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSignInMethods: [],
            error: null,
        };
    }

    componentDidMount() {
        this.fetchSignInMethods();
    }

    fetchSignInMethods = () => {
        this.props.firebase.auth
            .fetchSignInMethodsForEmail(this.props.authUser.email)
            .then(
                activeSignInMethods => this.setState({activeSignInMethods, error: null}),
            )
            .catch(error => this.setState({error}));
    }

    onSocialLoginLink = provider => {
        this.props.firebase.auth.currentUser
            .linkWithPopup(this.props.firebase[provider])
            .then(this.fetchSignInMethods)
            .catch(error => this.setState({error}));
    };

    onUnlink = providerId => {
        this.props.firebase.auth.currentUser
            .unlink(providerId)
            .then(this.fetchSignInMethods)
            .catch(error => this.setState({error}));
    };

    onDefaultLoginLink = password => {
        const credential = this.props.firebase.emailAuthProvider.credential(
            this.props.authUser.email,
            password,
        );

        this.props.firebase.auth.currentUser
            .linkAndRetrieveDataWithCredential(credential)
            .then(this.fetchSignInMethods)
            .catch(error => this.setState({error}));
    };

    render() {
        const {activeSignInMethods, error} = this.state;

        return (
            <div>
                <span className="h4 mar-1">Change SignIn Methods:</span>
                <ul className="list-group">
                    {SIGN_IN_METHODS.map(signInMethod => {
                        const onlyOneLeft = activeSignInMethods.length === 1;
                        const isEnabled = activeSignInMethods.includes(signInMethod.id);

                        return (
                            <li key={signInMethod.id} className="list-group-item">
                                {signInMethod.id === 'password' ? (
                                    <DefaultLoginToggle
                                        onlyOneLeft={onlyOneLeft}
                                        isEnabled={isEnabled}
                                        signInMethod={signInMethod}
                                        onLink={this.onDefaultLoginLink}
                                        onUnlink={this.onUnlink}
                                    />
                                ) : (
                                    <SocialLoginToggle
                                        onlyOneLeft={onlyOneLeft}
                                        isEnabled={isEnabled}
                                        signInMethod={signInMethod}
                                        onLink={this.onSocialLoginLink}
                                        onUnlink={this.onUnlink}
                                    />
                                )}
                            </li>
                        );
                    })}
                </ul>
                {error && error.message}
            </div>
        );
    }
}

class DefaultLoginToggle extends Component {
    constructor(props) {
        super(props);

        this.state = {passwordOne: '', passwordTwo: ''};
    }

    onSubmit = event => {
        event.preventDefault();

        this.props.onLink(this.state.passwordOne);
        this.setState({passwordOne: '', passwordTwo: ''});
    };

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {
            onlyOneLeft,
            isEnabled,
            signInMethod,
            onUnlink,
        } = this.props;

        const {passwordOne, passwordTwo} = this.state;

        const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

        return isEnabled ? (
            <button type="button" onClick={() => onUnlink(signInMethod.id)} disabled={onlyOneLeft} className="btn btn-secondary btn-lg">
                Deactivate {signInMethod.id}
            </button>
        ) : (
            <form onSubmit={this.onSubmit}>
                <input
                    type="password"
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    placeholder="New Password"
                />
                <input
                    type="password"
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    placeholder="Confirm New Password"
                />

                <button disabled={isInvalid} type="submit" className="btn btn-info">
                    Link {signInMethod.id}
                </button>
            </form>
        );
    }
}

const SocialLoginToggle = ({
    onlyOneLeft,
    isEnabled,
    signInMethod,
    onLink,
    onUnlink,
}) =>
    isEnabled ? (
        <button type="button" onClick={() => onUnlink(signInMethod.id)} disabled={onlyOneLeft}>
            Deactivate {signInMethod.id}
        </button>
    ) : (
        <button type="button" onClick={() => onLink(signInMethod.provider)}>
            Link {signInMethod.id}
        </button>
    );

const LoginManagement = withFirebase(LoginManagementBase);

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <Card><span className="h3">Account: </span> <b className="h3">{authUser.username}</b></Card>
                <MediaQuery query="(min-width: 767px)">
                    <ItemRight><PasswordForgetForm /></ItemRight><br/>
                    <ItemRight><PasswordChangeForm /></ItemRight><br/>
                    <ItemRight><LoginManagement authUser={authUser} /></ItemRight>
                </MediaQuery>
            </div>
        )}
    </AuthUserContext.Consumer>
)

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(AccountPage);
