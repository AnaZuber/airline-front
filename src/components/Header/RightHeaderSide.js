import React, { Component } from "react";
import { NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth-service";

import "./Header.css";
import routes from "../../RoutePaths";

export class RightHeaderSide extends Component {
  logout = () => {
    logout();
    this.props.setLoggedIn(localStorage.getItem("user") !== null);
  };

  render() {
    return (
      <ul className="navbar-nav ml-auto">
        {!this.props.loggedIn ? (
          <NavItem>
            <Link className="btn btn-light" type="submit" to={routes.Login}>
              Login
            </Link>
            <Link
              className="btn btn-primary"
              type="submit"
              to={routes.Register}
            >
              Register
            </Link>
          </NavItem>
        ) : (
          <NavItem>
            <Link
              className="btn btn-primary"
              type="submit"
              to="/"
              onClick={this.logout}
            >
              Logout
            </Link>
          </NavItem>
        )}
      </ul>
    );
  }
}

export default RightHeaderSide;
