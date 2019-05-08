import React from "react";
import { NavLink } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavItem,
  Nav,
  Container,
  NavLink as Link
} from "reactstrap";
import "./AppNav.scss";

class AppNav extends React.Component {
  state = {
    collapseOpen: false,
    color: "navbar-transparent"
  };
  render() {
    const { isAuthenticated, handleSignout } = this.props;
    return (
      <Navbar className="navbar-absolute fixed-top" expand="lg">
        <Container>
          <div className="navbar-wrapper">
            <NavLink className="navbar-brand" to="/">
              Financial Tracker
            </NavLink>
          </div>
          <button
            aria-controls="navigation-index"
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-toggle="collapse"
            type="button"
            onClick={this.toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </button>
          <Collapse isOpen={this.state.collapseOpen} navbar>
            <Nav navbar className="ml-auto">
              {isAuthenticated ? (
                <React.Fragment>
                  <NavItem>
                    <NavLink to="/portfolio" className="nav-link">
                      <i className="tim-icons icon-spaceship" /> My Portfolio
                    </NavLink>
                  </NavItem>
                  <NavItem style={{ cursor: "pointer" }}>
                    <Link className="nav-link" onClick={handleSignout}>
                      <i className="fas fa-sign-out-alt" /> Log out
                    </Link>
                  </NavItem>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <NavItem>
                    <NavLink to="/" className="nav-link">
                      <i className="fas fa-user" /> Register
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/login" className="nav-link ">
                      <i className="fas fa-fingerprint" /> Login
                    </NavLink>
                  </NavItem>
                </React.Fragment>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default AppNav;
