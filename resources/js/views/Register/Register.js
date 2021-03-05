import React, { Component } from "react";

class RegisterForm extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        role: "",
        isLoading: "",
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
                .post("http://localhost:8003/api/auth/register", { newUser })
                .then((response) => {
                    console.log("Registered");
                    this.props.history.push("/login");
                });
        }
    };
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { onChange, registerSubmit } = this;

        return (
            <div>
                <div className="row mt-5">
                    <div className="col-md-4 mx-auto">
                        <form class="card p-2" onSubmit={registerSubmit}>
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
                                                name="exampleRadios"
                                                id="Radios1"
                                                value="option1"
                                                checked
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
                                                name="exampleRadios"
                                                id="Radios2"
                                                value="option2"
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
