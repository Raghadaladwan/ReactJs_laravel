import React, { Component } from "react";
import cookie from "react-cookies";

import { Link } from "react-router-dom";
class Header extends Component {
    signOut = () => {
        if (cookie.load("isLoggedIn") !== undefined) {
            cookie.remove("isLoggedIn");
            window.location.reload();
        }
    };

    render() {
        console.log(this.props.cookieItem);
        if (this.props.cookieItem === undefined) {
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">
                        ABC COMPANY
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav mr-auto">
                            <Link
                                to="register"
                                style={{
                                    color: "inherit",
                                    textDecoration: "inherit",
                                }}
                            >
                                <li className="nav-item active nav-link px-3">
                                    Register{" "}
                                    <span className="sr-only">(current)</span>
                                </li>
                                <li></li>
                            </Link>
                            <Link
                                to="login"
                                style={{
                                    color: "inherit",
                                    textDecoration: "inherit",
                                }}
                            >
                                <li className="nav-item active nav-link px-3">
                                    Login{" "}
                                    <span className="sr-only">(current)</span>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </nav>
            );
        } else {
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">
                        ABC COMPANY
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav mr-auto">
                            <Link
                                to="dashboard"
                                style={{
                                    color: "inherit",
                                    textDecoration: "inherit",
                                }}
                            >
                                <li className="nav-item active nav-link px-3">
                                    Dashboard{" "}
                                    <span className="sr-only">(current)</span>
                                </li>
                            </Link>
                            <span onClick={this.signOut}>
                                <Link className="nav-item nav-link" to={"/"}>
                                    {"Log out"}
                                </Link>
                            </span>
                        </ul>
                    </div>
                </nav>
            );
        }
    }
}

export default Header;
