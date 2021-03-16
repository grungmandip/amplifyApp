import React from 'react';
import {StyledContainer, ItemCenter} from "./style";
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgotPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from  '../../constants/routes'
import { withAuthentication } from '../Session';

const App = () => (
    <Router>
        <StyledContainer>
            <h2>Menu</h2>
            <Navigation />

            <hr/>

            <Route exact path={ROUTES.LANDING} component={LandingPage}/>
            <ItemCenter><Route path={ROUTES.SIGN_UP} component={SignUpPage}/></ItemCenter>
            <ItemCenter><Route path={ROUTES.SIGN_IN} component={SignInPage}/></ItemCenter>
            <ItemCenter><Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgotPage}/></ItemCenter>
            <Route path={ROUTES.HOME} component={HomePage}/>
            <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
            <Route path={ROUTES.ADMIN} component={AdminPage}/>
        </StyledContainer>
    </Router>
);

export default withAuthentication(App);