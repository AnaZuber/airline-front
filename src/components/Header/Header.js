import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Collapse,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import routes from "../../RoutePaths";
import { RightHeaderSide } from "./RightHeaderSide";
import "./Header.css";
export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { authenticated, role } = this.props;
    const { collapsed } = this.state;
    const isAdmin = role === 0;
    const isWorker = role === 1;
    const isCustomer = role === 2;
    return (
      <header>
        <Navbar
          className="navbar navbar-expand-md navbar-light fixed-top bg-light"
          light
        >
          <NavbarBrand tag={Link} to={routes.Home}>
            <img
              className="mb-4"
              src="images/logo.png"
              alt=""
              width="50"
              height="50"
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} />

          <Collapse
            className="d-md-inline-flex flex-sm-row"
            isOpen={!collapsed}
            navbar
          >
            <ul className="navbar-nav mr-auto">
              <NavItem>
                <Link className="nav-link" to={routes.Home}>
                  Home
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to={routes.Flights}>
                  Flights
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to={routes.Search}>
                  Search
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to={routes.Info}>
                  Info
                </Link>
              </NavItem>
              {isCustomer && (
                <NavItem>
                  <Link className="nav-link" to={routes.Reservations}>
                    Reservations
                  </Link>
                </NavItem>
              )}
              {isCustomer && (
                <NavItem>
                  <Link className="nav-link" to={routes.EditProfile}>
                    My profile
                  </Link>
                </NavItem>
              )}
              {(isWorker || isAdmin) && (
                <NavItem>
                  <Link className="nav-link" to={routes.Tickets}>
                    Tickets
                  </Link>
                </NavItem>
              )}
              {isAdmin && (
                <NavItem>
                  <Link className="nav-link" to={routes.Locations}>
                    Locations
                  </Link>
                </NavItem>
              )}
              {isAdmin && (
                <NavItem>
                  <Link className="nav-link" to={routes.Airlines}>
                    Airlines
                  </Link>
                </NavItem>
              )}
            </ul>
            <RightHeaderSide
              loggedIn={authenticated}
              setLoggedIn={this.props.setLoggedIn}
            />
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
