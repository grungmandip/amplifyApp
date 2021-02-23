import React from 'react';
import { Link } from "react-router-dom";
import * as ROUTES from '../../constants/routes';

const Home = () => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.HOME}>Home</Link>
            </li>
        </ul>
    </div>
)

export default Home;