import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { Container } from "reactstrap";

@connect(state => ({ user: state.auth.user }))
@withRouter
class MyPortfolio extends React.Component {
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <Container>
          <h1>My Portfolio page</h1>
        </Container>
      </React.Fragment>
    );
  }
}

export default MyPortfolio;
