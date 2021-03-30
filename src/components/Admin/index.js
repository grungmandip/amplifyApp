import React, {Component} from 'react';
import {H4} from "../App/style";
import {Switch, Route, Link} from "react-router-dom";
import {compose} from "recompose";

import {withFirebase} from "../Firebase";
import {withAuthorization, withEmailVerification} from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

const AdminPage = () => (
    <div>
        <H4>Admin</H4>
        <p>
            The Admin page is accessible by every signed in admin user.
        </p>

        <Switch>
            <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
            <Route exact path={ROUTES.ADMIN} component={UserList} />
        </Switch>
    </div>
);

class UserListBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            users: [],
        };
    }

    componentDidMount() {
        this.setState({loading:true});

        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();
            const userList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));

            this.setState({
                users: userList,
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    deleteThisUser = (userId) => {
        const user = this.props.firebase
            .user(userId);
        user
            .delete()
            .then(() =>
                console.log('Successfully deleted user'),
                window.location.reload(false),
            )
            .catch(error => this.setState({error}));

    }

    render() {
        const {users, loading} = this.state;

        return (
            <div>
                <h2>Users</h2>
                {loading && <div>Loading ...</div>}
                {users.map(user => (
                    <div key={user.uid} className="height-100 row d-flex justify-content-center align-items-center mt-3">
                        <div className="col-md-7">
                            <div className="p-3 bg-white rounded">
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                        <div className="position-relative">
                                            <img src="https://i.imgur.com/EnANUqj.jpg" width="80" className="rounded-circle" />
                                            <span className="position-absolute dots"></span>
                                            <div className="ml-2">
                                                <h5 className="mb-0">{user.username}</h5> <span>{user.email}</span>
                                                <div className="d-flex flex-row">
                                                    <span className="mr-3">1039 posts</span>
                                                    <span className="mr-3">42.9 followers</span>
                                                    <span>930 following</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <span className="box-ellipse">
                                            <Link to={{
                                                pathname: `${ROUTES.ADMIN}/${user.uid}`,
                                                state: {user},
                                            }}>
                                                Details
                                            </Link>
                                        </span>
                                        <span className="box-pensil">
                                            <button type="button" onClick={() => {
                                                if (window.confirm('delete this user?')) {this.deleteThisUser(user.uid)}
                                            }}>
                                                Delete
                                            </button>
                                        </span>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

class UserItemBase extends Component {
    constructor(props) {
        super(props);

        console.log(props);
        this.state = {
            loading: false,
            user: null,
            ...props.location.state,
        };
    }

    componentDidMount() {
        console.log(this.state.user);
        if (this.state.user) {
            return;
        }

        this.setState({loading:true});

        this.props.firebase
            .user(this.props.match.params.id)
            .on('value', snapshot => {
                this.setState({
                    user: snapshot.val(),
                    loading: false,
                });
            });
    }

    componentWillUnmount() {
        this.props.firebase.user(this.props.match.params.id).off();
    }

    onSendPasswordResetEmail = () => {
        this.props.firebase.doPasswordReset(this.state.user.email);
    }

    render() {
        const {user, loading} = this.state;

        return (
            <div>
                <h2>User ({this.props.match.params.id})</h2>
                {loading && <div>Loading ...</div>}

                {user && (
                    <div>
                        <span>
                            <strong>ID:</strong> {user.uid}
                        </span>
                        <span>
                            <strong>E-Mail:</strong> {user.email}
                        </span>
                        <span>
                            <strong>Username:</strong> {user.username}
                        </span>
                        <span>
                            <button type="button" onClick={this.onSendPasswordResetEmail}>
                                Send Password Reset
                            </button>
                        </span>
                    </div>
                )}
            </div>
        );
    }
}

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

export default compose(
    withEmailVerification,
    withAuthorization(condition),
    withFirebase,
)(AdminPage);