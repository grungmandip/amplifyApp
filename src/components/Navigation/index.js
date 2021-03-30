import React from 'react';
import { Link } from "react-router-dom";
import './../../css/common.css'

import  { AuthUserContext } from '../Session';
import SignOutButton from "../SignOut";
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = () => (
    <AuthUserContext.Consumer>
        {authUser => authUser ? (<NavigationAuth authUser={authUser} />) : (<NavigationNonAuth />)}
    </AuthUserContext.Consumer>
);

const NavigationAuth = ({authUser}) => (
    <nav className="navbar navbar-inverse">
        <div className="navbar-header">
            <button className="navbar-toggle" type="button" data-toggle="collapse" data-target=".js-navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Menu</a>
        </div>
        <div className="collapse navbar-collapse js-navbar-collapse">
            <ul className="nav navbar-nav">
                <li>
                    <Link to={ROUTES.LANDING}>Landing</Link>
                </li>
            </ul>
            <ul className="nav navbar-nav">
                <li>
                    <Link to={ROUTES.HOME}>Home</Link>
                </li>
            </ul>
            <ul className="nav navbar-nav">
                <li>
                    <Link to={ROUTES.ACCOUNT}>Account</Link>
                </li>
            </ul>
            {!!authUser.roles[ROLES.ADMIN] && (
                <ul className="nav navbar-nav">
                    <li>
                        <Link to={ROUTES.ADMIN}>Admin</Link>
                    </li>
                </ul>
            )}
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <SignOutButton />
                </li>
            </ul>
        </div>
    </nav>
);

const NavigationNonAuth = () => (
    <nav className="navbar navbar-inverse">
        <div className="navbar-header">
            <button className="navbar-toggle" type="button" data-toggle="collapse" data-target=".js-navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Menu</a>
        </div>
        <div className="collapse navbar-collapse js-navbar-collapse">
            <ul className="nav navbar-nav">
                <li>
                    <Link to={ROUTES.LANDING}>Landing</Link>
                </li>
            </ul>
            <ul className="nav navbar-nav">
                <li>
                    <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                </li>
            </ul>
        </div>
    </nav>
)

export default Navigation;