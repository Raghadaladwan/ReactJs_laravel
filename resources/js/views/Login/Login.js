import React, { Component } from "react";

class LoginForm extends Component {
    state = {};


    render() {
        return (
            <>
                <div>
                    <div className="row mt-5">
                        <div className="col-md-3 mx-auto">
                        <form className = 'card p-2'>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter email"
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Password"
                                    />
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
