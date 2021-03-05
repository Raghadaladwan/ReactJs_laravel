import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
class RegisterForm extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        role: "2",
        isLoading: false,
        redirect: false,
        errors: {},
    };

    registerSubmit = async (event) => {
        event.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role,
        };

        if (newUser.name === "") {
            console.log("name", newUser.name);
            this.setState({ message_Name: "You shoud add your name" });
        }
        if (newUser.email === "") {
            this.setState({
                message_Email: "You shoud inter your email",
            });
        }
        if (newUser.password === "") {
            this.setState({
                message_Password: "Password is Required",
            });
        }
        if (
            newUser.name !== "" &&
            newUser.email !== "" &&
            newUser.password !== "" &&
            newUser.role !== ""
        ) {
            await axios
                .post("http://127.0.0.1:8005/api/auth/register", {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                    role: this.state.role,
                })
                .then((response) => {
                    console.log(response.data.access_token !== "");
                    if (response.data.access_token !== "") {
                        console.log("20020000000000000000000");
                        this.setState({
                            isLoading: true,
                            redirect: true,
                        });
                    
                    }
                })
                // this.setState({ message_Name: "You shoud add your name" })
                .catch((err) =>
                    this.setState({ message: err.response.data.errors })
                );
        }
    };
    onChange = (event) => {
        console.log(event.target.value);
        this.setState({ [event.target.name]: event.target.value });
    };
    handleRadioChange = (event) => {
        console.log(event.target.value);
        this.setState({
            role: event.target.value,
        });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/dashboard" />;
        }
        const { onChange, registerSubmit, handleRadioChange } = this;

        return (
            <div>
                <div className="row mt-5">
                    <div className="col-md-4 mx-auto">
                        <form
                            class="card p-2"
                            noValidate
                            onSubmit={registerSubmit}
                        >
                            <div className="form-group">
                                <label htmlFor="name">Your Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter Yor Name"
                                    value={this.state.name}
                                    onChange={onChange}
                                ></input>
                                <div
                                    className={
                                        this.state.message_Name
                                            ? "alert alert-dark"
                                            : null
                                    }
                                >
                                    {this.state.message_Name}
                                </div>
                            </div>
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
                                <div
                                    className={
                                        this.state.message_Email
                                            ? "alert alert-dark"
                                            : null
                                    }
                                >
                                    {this.state.message_Email}
                                </div>
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

                            <div className="form-group container">
                                <div className="form-row ">
                                    <div className="col-3">
                                        <div className="form-check ">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="Role"
                                                id="Radios1"
                                                value="1"
                                                checked={
                                                    this.state.role === "1"
                                                }
                                                onChange={handleRadioChange}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="Radios1"
                                            >
                                                Admin
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="Roule"
                                                id="Radios2"
                                                value="2"
                                                checked={
                                                    this.state.role === "2"
                                                }
                                                onChange={handleRadioChange}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="Radios2"
                                            >
                                                Customer
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={
                                    this.state.message
                                        ? "alert alert-dark"
                                        : null
                                }
                            >
                                {this.state.message}
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterForm;
