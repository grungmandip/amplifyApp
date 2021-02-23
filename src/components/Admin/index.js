import React from 'react';
import { Link } from "react-router-dom";
import * as ROUTES from '../../constants/routes';

const Admin = () => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>
        </ul>
    </div>
)

export default Admin;