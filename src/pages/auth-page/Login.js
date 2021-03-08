import React, { Component } from "react";
import routes from "../../RoutePaths";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../services/auth-service";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

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
    const { username, password } = this.state;
    login(username, password)
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        this.props.setLoggedIn(localStorage.getItem("user") !== null);
      })
      .catch((e) => {
        alert("Wrong username and password entry!");
      });
  };

  render() {
    return this.props.authenticated ? (
      <Redirect to={routes.Home} />
    ) : (
      <div className="container">
        <br />
        <div className="py-5 text-center">
          <h2>Log in</h2>
        </div>
        <div className="col-md-12 order-md-1">
          <form className="needs-validation" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                id="inputEmail"
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
                Log in
              </button>
              <div className="py-5 text-center">
                <h2>or create new account</h2>
              </div>
              <Link
                className="btn btn-lg btn-primary btn-block"
                type="submit"
                to={routes.Register}
              >
                Create new
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
