import React from 'react';
import { Link } from "react-router-dom";
import * as ROUTES from '../../constants/routes';

const Landing = () => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
        </ul>
    </div>
)

export default Landing;