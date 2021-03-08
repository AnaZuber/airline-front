import React, { Component } from "react";
import routes from "../../RoutePaths";
import { Link } from "react-router-dom";
import { register } from "../../services/auth-service";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    };
  }

  handleFirstNameChange = (event) => {
    this.setState({
      firstName: event.target.value,
    });
  };

  handleLastNameChange = (event) => {
    this.setState({
      lastName: event.target.value,
    });
  };

  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    register(this.state);
  };

  render() {
    return (
      <div className="container">
        <br />
        <div className="py-5 text-center">
          <h2>Please register new</h2>
        </div>
        <div className="col-md-12 order-md-1">
          <form className="needs-validation" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                id="inputfirstName"
                className="form-control"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.handleFirstNameChange}
                required
                autoFocus
              />
            </div>
            <div className="user-box">
              <label>Last name</label>
              <input
                type="text"
                id="inputlastName"
                className="form-control"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.handleLastNameChange}
                required
                autoFocus
              />
            </div>
            <div className="user-box">
              <label>Username</label>
              <input
                type="text"
                id="inputUsername"
                className="form-control"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleUsernameChange}
                required
                autoFocus
              />
            </div>
            <div className="user-box">
              <label>Password</label>
              <input
                type="password"
                id="inputPassword"
                className="form-control"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
                required
              />
            </div>
            <br />
            <div className="col text-center">
              <button
                className="btn btn-lg btn-primary btn-block"
                type="submit"
              >
                Register
              </button>
              <div className="py-5 text-center">
                <h2> or sign in to existing account</h2>
              </div>
              <Link
                className="btn btn-lg btn-primary btn-block"
                type="submit"
                to={routes.Login}
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
