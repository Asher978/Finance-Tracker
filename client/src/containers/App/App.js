import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { renderRoutes } from "react-router-config";
import qs from "qs";

import "./App.scss";

import AppNav from "~/components/AppNav/AppNav";

@connect(state => ({ user: state.auth.user }))
@withRouter
class App extends React.Component {
  static propTypes = {
    route: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    user: PropTypes.shape({
      email: PropTypes.string
    })
  };

  static defaultProps = {
    user: null
  };

  state = {
    user: this.props.user,
    prevProps: this.props
  };

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    if (location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { prevProps } = state;
    // Compare the incoming prop to previous prop
    const user = !_.isEqual(prevProps.user, props.user)
      ? props.user
      : state.user;

    if (!prevProps.user && props.user) {
      const query = qs.parse(props.location.search, {
        ignoreQueryPrefix: true
      });
      props.history.push(query.redirect || "/portfolio");
    } else if (prevProps.user && !props.user) {
      // logout
      props.history.push("/");
    }

    return {
      user,
      // Store the previous props in state
      prevProps: props
    };
  }

  render() {
    const { route } = this.props;
    return (
      <React.Fragment>
        <AppNav />
        <main id="main" className="app">
          {renderRoutes(route.routes)}
        </main>
      </React.Fragment>
    );
  }
}

export default App;
