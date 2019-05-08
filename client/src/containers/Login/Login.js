import React from "react";
import {
  Form,
  InputGroup,
  Container,
  Col,
  Input,
  InputGroupAddon,
  InputGroupText,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter
} from "reactstrap";

// redux
import { connect } from "react-redux";
import { login } from "~/redux/modules/auth";

// styling
import "./Login.scss";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  componentDidMount() {
    document.getElementById("main").classList.add("app__login");
  }

  componentWillUnmount() {
    document.getElementById("main").classList.remove("app__login");
  }

  handleOnChange = e => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  };

  handleLogin = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const data = { email, password };
    this.props.login(data);
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="login full__page">
        <div className="content">
          <Container>
            <Col className="mr-auto ml-auto" md="6" lg="4">
              <Form className="login__form" onSubmit={this.handleLogin}>
                <Card>
                  <CardHeader>
                    <img src={require("./card-success.png")} />
                    <CardTitle tag="h1">Log in</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="email"
                        name="email"
                        onChange={this.handleOnChange}
                        value={email}
                        placeholder="Email"
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-lock-circle" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={this.handleOnChange}
                      />
                    </InputGroup>
                  </CardBody>
                  <CardFooter>
                    <Button
                      color="info"
                      block
                      type="submit"
                      className="mb-3 btn btn-primary btn-lg btn-block">
                      Sign in
                    </Button>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Container>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  login
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
