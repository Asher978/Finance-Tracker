import React from "react";
import { NavLink } from "react-router-dom";

import "./Home.scss";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardFooter,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  Button,
  Form
} from "reactstrap";

class Home extends React.Component {
  componentDidMount() {
    document.getElementById("main").classList.add("app__home");
  }

  componentWillUnmount() {
    document.getElementById("main").classList.remove("app__home");
  }

  render() {
    return (
      <div className="page__overlay d-flex justify-content-center align-items-center gradient">
        <Container>
          <Row className="mt-5">
            <Col md="6" className="text-center text-md-left mt-xl mb-5">
              <h1 className="h1-responsive font-weight-bold animation fadein__Left">
                Sign up right now!{" "}
              </h1>
              <hr className="hr-light animation fadein__Left" />
              <h6 className="mb-4 animation fadein__Left">
                Stay tuned in and track your best stocks. Share it with friends
                and see what's on top of their list...
              </h6>
              <Button
                className="btn-outline-white animation fadein__Left"
                outline
                color="white">
                Learn More
              </Button>
            </Col>
            <Col md="6" xl="5">
              <Form className="register__form">
                <Card>
                  <CardHeader>
                    <img src={require("./card-success.png")} />
                    <CardTitle tag="h1">register</CardTitle>
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
                        // value={email}
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
                        // value={password}
                        onChange={this.handleOnChange}
                      />
                    </InputGroup>
                  </CardBody>
                  <CardFooter>
                    <Button
                      block
                      type="submit"
                      className="mb-3 btn btn-register btn-lg btn-block">
                      Sign in
                    </Button>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
