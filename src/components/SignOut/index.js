import React from 'react';

import {withFirebase} from '../Firebase';
import {Button} from "@material-ui/core";

const SignOutButton = ({ firebase }) => (
    <Button variant="contained" color='secondary' onClick={firebase.doSignOut}>Sign Out</Button>
);

const SignOutLink = ({firebase}) => (
    <span onClick={firebase.doSignOut}>Sign Out</span>
);

export default withFirebase(SignOutButton, SignOutLink);
