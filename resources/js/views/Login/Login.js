import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class LoginForm extends Component {
    state = {
        email: "",
        password: "",
        redirect: false,
        isLoading: false,
        role: "",
        user_id: "",
        token:"",
        errors: {},
    };

    loginSubmit = async (event) => {
        event.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
        };

        if (user.email === "") {
            this.setState({
                message_Email: "You shoud inter your email",
            });
        }
        if (user.password === "") {
            this.setState({
                message_Password: "Password is Required",
            });
        }
        if (user.email !== "" && user.password !== "") {
            await axios
                .post("http://127.0.0.1:8001/api/auth/login", {
                    email: this.state.email,
                    password: this.state.password,
                })
                .then((response) => {
                    if (response.data.access_token !== "") {
                        this.setState({
                            isLoading: true,
                            redirect: true,
                            role: response.data.role,
                            user_id: response.data.user_id,
                            token : response.data.access_token
                        });
                    }
                })
                .catch((err) =>
                    this.setState({ errors: err.response.data.errors })
                );
        }
    };
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        if (this.state.redirect) {
            return (
                // this.props.history.push("/loginpage");
                <Redirect
                    to={{
                        pathname: "/dashboard",
                        state: {
                            isLoading: this.state.isLoading,
                            role: this.state.role,
                            user_id: this.state.user_id,
                            token:this.state.token
                        },
                    }}
                />
            );
        }
        const { onChange, loginSubmit } = this;
        return (
            <>
                <div>
                    <div className="row mt-5">
                        <div className="col-md-3 mx-auto">
                            <form className="card p-2" onSubmit={loginSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter email"
                                        value={this.state.email}
                                        onChange={onChange}
                                    ></input>
                                </div>
                                <div
                                    className={
                                        this.state.message_Email
                                            ? "alert alert-dark"
                                            : null
                                    }
                                >
                                    {this.state.message_Email}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={onChange}
                                    />
                                </div>
                                <div
                                    className={
                                        this.state.message_Password
                                            ? "alert alert-dark"
                                            : null
                                    }
                                >
                                    {this.state.message_Password}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default LoginForm;
