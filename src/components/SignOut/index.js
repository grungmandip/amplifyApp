import React from 'react';

import {withFirebase} from '../Firebase';

const SignOutButton = ({ firebase }) => (
    <button className="btn btn-danger mar-2" type="button" onClick={firebase.doSignOut}>Sign Out</button>
);

export default withFirebase(SignOutButton);
