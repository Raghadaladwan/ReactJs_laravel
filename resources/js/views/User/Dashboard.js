import React, { Component } from "react";
import cookie from "react-cookies";

class Dashboard extends Component {
    state = {
        complaint: [],
        role: "",
        title: "",
        description: "",
        urgent: "1",
        user_id: "",
    };

    componentDidMount() {
        console.log(cookie.load("isLoggedIn"));
        fetch("http://127.0.0.1:8001/api/complaint", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                    cookie.load("isLoggedIn").access_token
                }`,
            },
            cache: "default",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                this.setState({
                    complaint: data.data,
                    role: cookie.load("isLoggedIn").role,
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    addComplaint = (event) => {
        event.preventDefault();
        let newComplaint = {
            title: event.target["title"].value,
            description: event.target["description"].value,
            urgent: event.target["urgent"].value,
        };
    };

    // Customer Can Update
    UpdateComplaint = (event) => {
        event.preventDefault();
        const data = !this?.props?.status?.edit;
        this.props.setStatus({
            edit: data,
        });
    };

    handleRadioChange = (event) => {
        console.log(event);
        console.log(event.target.value);
        this.setState({
            urgent: event.target.value,
        });
    };

    renderTableData() {
        return this.state.complaint.map((complaint, index) => {
            const { id, title, status, urgent, description } = complaint; //destructuring
            return (
                <tr key={id}>
                    <td>{index + 1}</td>
                    <td>{title}</td>
                    <td>{description}</td>

                    <td>
                        {status == 1
                            ? "pending"
                            : status == 2
                            ? "resolved"
                            : "dismissed"}
                    </td>

                    <td
                        style={{
                            color: urgent == "1" ? "red" : "none",
                        }}
                    >
                        {urgent == "1" ? "Urgent" : "Can wait"}
                    </td>
                    {this.state.role == "Admin" ? (
                        <td>
                            <button
                                type="button"
                                className="btn bg-success m-1"
                                aria-label="Left Align"
                            >
                                Solve
                            </button>
                            <button
                                type="button"
                                className="btn bg-danger m-1 "
                                aria-label="Left Align"
                            >
                                Dismissed
                            </button>
                        </td>
                    ) : (
                        <td>
                            <button
                                className="btn bg-primary"
                                aria-label="Left Align"
                            >
                                Edit
                            </button>
                        </td>
                    )}
                </tr>
            );
        });
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const update = {
            id: this.state.user_id,
            title: this.state.title,
            description: this.state.description,
            urgent: this.state.urgent,
        };

        if (update.title === "") {
            this.setState({
                message_title: "You shoud inter your title",
            });
        }
        if (update.description === "") {
            this.setState({
                message_description: "Password is description",
            });
        }
        if (update.title !== "" && update.description !== "") {
            fetch("http://127.0.0.1:8001/api/store/complaint", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${
                        cookie.load("isLoggedIn").access_token
                    }`,
                },
                cache: "default",
                body: JSON.stringify({
                    title: this.state.title,
                    description: this.state.description,
                    urgent: this.state.urgent,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    this.setState({
                        complaint: [...this.state.complaint, data.data],
                    });
                })
                .catch((error) => {
                    console.error("Error:", error);
                });

            this.setState({
                title: "",
                description: "",
                urgent: "1",
            });
        }
    };

    renderTableHeader() {
        let header = Object.keys(this.state.complaint);
        return header.map((key, index) => {
            return (
                <th key={index} scope="col">
                    {key.toUpperCase()}
                </th>
            );
        });
    }

    render() {
        const {
            addComplaint,
            deleteComponent,
            onChange,
            handleRadioChange,
            onSubmit,
        } = this;

        return (
            <div>
                {this.state.role == "Admin" ? (
                    <div className="container">
                        <div className=" row h-150 justify-content-center">
                            <h1 className="pt-5">This is all your complaint</h1>
                        </div>

                        <div className="row ">
                            <div className="col ">
                                <table className="table table-striped">
                                    <tbody>{this.renderTableData()}</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="pt-5 pl-5">
                            <h1>This is all your complaint</h1>
                        </div>
                        <div className="row pl-5 ">
                            <div className="col col-lg-7">
                                <table className="table table-striped">
                                    <tbody>{this.renderTableData()}</tbody>
                                </table>
                            </div>
                            <div className="col col-lg-4">
                                <form>
                                    <div>
                                        <form
                                            className="card p-2"
                                            onSubmit={onSubmit}
                                        >
                                            <div className="form-group">
                                                <label htmlFor="title">
                                                    Complaint title
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="title"
                                                    name="title"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter title"
                                                    value={this.state.title}
                                                    onChange={onChange}
                                                ></input>
                                                <div
                                                    className={
                                                        this.state.message_title
                                                            ? "alert alert-dark"
                                                            : null
                                                    }
                                                >
                                                    {this.state.message_title}
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label
                                                    htmlFor="description"
                                                    className="form-label"
                                                >
                                                    Tell Us More
                                                </label>
                                                <textarea
                                                    type="text"
                                                    className="form-control"
                                                    id="description"
                                                    name="description"
                                                    rows="3"
                                                    placeholder="Enter complaint description"
                                                    value={
                                                        this.state.description
                                                    }
                                                    onChange={onChange}
                                                ></textarea>
                                            </div>
                                            <div
                                                className={
                                                    this.state
                                                        .message_description
                                                        ? "alert alert-dark"
                                                        : null
                                                }
                                            >
                                                {this.state.message_description}
                                            </div>

                                            <div className="form-group container">
                                                <div className="form-row ">
                                                    <div className="col-3">
                                                        <div className="form-check ">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="urgent"
                                                                id="Radios1"
                                                                value="1"
                                                                checked={
                                                                    this.state
                                                                        .urgent ===
                                                                    "1"
                                                                }
                                                                onChange={
                                                                    handleRadioChange
                                                                }
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="Radios1"
                                                            >
                                                                Urgent
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-3">
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="urgent"
                                                                id="Radios2"
                                                                value="2"
                                                                checked={
                                                                    this.state
                                                                        .urgent ===
                                                                    "2"
                                                                }
                                                                onChange={
                                                                    handleRadioChange
                                                                }
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="Radios2"
                                                            >
                                                                Unurgent
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Dashboard;
