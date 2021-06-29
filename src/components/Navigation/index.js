import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import  { AuthUserContext } from '../Session';
import SignOutButton from "../SignOut";
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import SignOutLink from "../SignOut";

const Navigation = () => (
    <AuthUserContext.Consumer>
        {authUser => authUser ? (<NavigationAuth authUser={authUser} />) : (<NavigationNonAuth />)}
    </AuthUserContext.Consumer>
);

const NavigationAuth = ({authUser}) => {
    const classes = useStyles();

    const menuItem = () => {
        return routesList.map(({name, route}) => {
            return (
                <Button
                    {...{
                        key: name,
                        color: 'inherit',
                        size: 'large',
                        className: classes.menuBtn,
                    }}
                >
                    <Link to={route} style={{textDecoration: 'none'}}>{name}</Link>
                </Button>
            );
        });
    };

    const spMenuItem = () => {
        return (
            <span>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick}>
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {routesList.map(({name, route}) => {
                        return (
                            <MenuItem
                                {...{
                                    key: name,
                                    onClick: handleClick,
                                }}
                            >
                                <Link to={route} style={{textDecoration: 'none'}}>{name}</Link>
                            </MenuItem>
                        );
                    })}

                    {!!authUser.roles[ROLES.ADMIN] && (
                        <MenuItem><Link to={ROUTES.ADMIN} style={{textDecoration: 'none'}}>Admin</Link></MenuItem>
                    )}
                    <MenuItem><SignOutLink /></MenuItem>
                </Menu>
                <Typography variant='h6' component="h1" className={classes.logo}>
                    WebAmplify
                </Typography>
            </span>
        );
    };

    const [state, setState] = useState({
        spView: false,
    })

    const {spView} = state;

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({...prevState, spView: true}))
                : setState((prevState) => ({...prevState, spView: false}));
        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    }, []);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {spView
                        ? (
                            spMenuItem()
                        )
                        : (
                            <span>
                                <Typography variant='h5' component="h1" className={classes.logo}>
                                    WebAmplify
                                </Typography>
                                {menuItem()}
                                {!!authUser.roles[ROLES.ADMIN] && (
                                    <Button color='inherit' className={classes.menuBtn}><Link to={ROUTES.ADMIN} style={{textDecoration: 'none'}}>Admin</Link></Button>
                                )}
                            </span>
                        )
                    }
                    {!spView ? <SignOutButton /> : ''}
                </Toolbar>
            </AppBar>
        </div>
    );
}

const NavigationNonAuth = () => {
    const spMenuItem = () => {
        return (
            <span>
                <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {routesList.map(({name, route}) => {
                        return (
                            <MenuItem
                                {...{
                                    key: name,
                                    onClick: handleClick,
                                }}
                            >
                                <Link to={route}>{name}</Link>
                            </MenuItem>
                        );
                    })}
                </Menu>
            </span>
        );
    };
    const [state, setState] = useState({
        spView: false,
    })
    const {spView} = state;

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({...prevState, spView: true}))
                : setState((prevState) => ({...prevState, spView: false}));
        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    }, []);

    const classes = useStyles();
    return (
        <header className={classes.headerMenu}>
            <AppBar className={classes.header}>
                <Toolbar className={classes.toolbar}>
                    {spView
                        ? spMenuItem()
                        : (
                            <span>
                                <Typography variant='h5' component="h1" className={classes.logo}>
                                    WebAmplify
                                </Typography>
                                <Button color="inherit" className={classes.menuBtn}>
                                    <Link to={ROUTES.LANDING}>Landing</Link>
                                </Button>
                            </span>
                        )
                    }
                    <Button color='inherit'>
                        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                    </Button>
                </Toolbar>
            </AppBar>
        </header>
    );
}

const routesList = [
    {name: 'Landing', route: ROUTES.LANDING},
    {name: 'Home', route: ROUTES.HOME},
    {name: 'Account', route: ROUTES.ACCOUNT},
];

const useStyles = makeStyles((theme) => ({
    headerMenu: {
        marginBottom: 80
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        color: "#FFFEFE",
        textAlign: "left",
        display: 'inline-block'
    },
    menuBtn: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
        textDecoration: "none",
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between"
    },
    header: {
        backgroundColor: "#400CCC",
        paddingRight: "79px",
        paddingLeft: "118px",
        "@media (max-width: 900px)": {
            paddingLeft: 0,
        },
    },
}));

export default Navigation;