import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"


function NavBar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
                Greenwich
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    {(props.role === "Admin") && (
                        <React.Fragment>
                            <NavLink className="nav-item nav-link" to="/AdminCheck">
                                Approving account
                            </NavLink>
                            <NavLink className="nav-item nav-link" to="/AccountList">
                                Account List
                            </NavLink>
                            <NavLink className="nav-item nav-link" to="/AddminCreateAccount">
                                Create new account
                            </NavLink>
                        </React.Fragment>
                    )}
                    {(props.role === "Student") && (
                        <React.Fragment>
                            <NavLink className="nav-item nav-link" to="/submitForm">
                                Submit news
                            </NavLink>
                            <NavLink className="nav-item nav-link" to="/mySubmit">
                                My submit
                            </NavLink>
                        </React.Fragment>
                    )}
                    {(props.role === "Coordinator") && (
                        <React.Fragment>
                            <NavLink className="nav-item nav-link" to="/notification">
                                Notification
                            </NavLink>
                        </React.Fragment>
                    )}
                    {!props.email && (
                        <React.Fragment>
                            <NavLink className="nav-item nav-link" to="/login">
                                Login
                            </NavLink>
                            <NavLink className="nav-item nav-link" to="/signup">
                                Sign up
                            </NavLink>
                        </React.Fragment>
                    )
                    }
                    {props.email && (
                        <React.Fragment>
                            <NavLink className="nav-item nav-link" to="/profit">
                                {props.email}
                            </NavLink>
                            <NavLink className="nav-item nav-link" to="/logout">
                                Log out
                            </NavLink>
                        </React.Fragment>
                    )
                    }
                </div>
            </div>
        </nav >
    );
}

export default NavBar;