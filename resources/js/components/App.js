import React from "react";
import ReactDOM from "react-dom";
import cookie from "react-cookies";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Register from "../views/Register/Register";
import Login from "../views/Login/Login";
import Dashboard from "../views/User/Dashboard";
import Home from "./Home/Home";

class App extends React.Component {
    state = {
        cookieItem: cookie.load("isLoggedIn"),
    };

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header cookieItem={this.state.cookieItem} />
                    <Route
                        exact
                        path="/"
                        component={Home}
                        cookieItem={this.state}
                    />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}
