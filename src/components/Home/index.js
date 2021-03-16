import React from 'react';
import {compose} from "recompose";

import {withAuthorization, withEmailVerification} from '../Session';

const HomePage = () => (
    <div>
        <h1>Home Page</h1>
        <p>The Home Page for your warmness.</p>
    </div>
);

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(HomePage);