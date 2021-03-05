import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter , Route } from "react-router-dom";

import Header from "./Header/Header";
import Register from "../views/Register/Register";
import Login from '../views/Login/Login'
import Dashboard from '../views/User/Dashboard'

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Route path="/register"  component={Register} />
                <Route path="/login"  component={Login} />
                <Route path="/dashboard"  component={Dashboard} />
            </div>
        </BrowserRouter>
    );
}


export default App;

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}
