import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  Container,
  Form,
  Input,
  Button,
  InputGroup,
  Row,
  Col,
  Card
} from "reactstrap";
import "./MyPortfolio.scss";

// actions
import { lookUpStock, addToPortfolio } from "~/redux/modules/stock";

@connect(
  state => ({
    user: state.auth.user,
    stock: state.stock.lookedUpStock,
    addedStock: state.stock.addedStock,
    stockLoookupError: state.stock.stockLoookupError
  }),
  { lookUpStock, addToPortfolio }
)
@withRouter
class MyPortfolio extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string
    }).isRequired,
    lookUpStock: PropTypes.func.isRequired,
    addToPortfolio: PropTypes.func.isRequired,
    stock: PropTypes.shape({
      last_price: PropTypes.string,
      name: PropTypes.string,
      ticker: PropTypes.string
    }),
    stockLoookupError: PropTypes.string
  };

  state = { stock_ticker: "", stockInput: "" };
  componentDidMount() {}

  // TODO Add stock symbols that a user can choose from
  handleLookupStock = e => {
    e.preventDefault();
    const { stockInput } = this.state;
    this.props.lookUpStock({ stock: stockInput });
  };

  handleAddToPortfolio = e => {
    e.preventDefault();
    const { ticker } = this.props.stock;
    console.log("TICKER", ticker);
    this.props.addToPortfolio({ stock_ticker: ticker });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { stock, stockLoookupError, addedStock } = this.props;
    return (
      <div className="full__page portfolio">
        <div className="content">
          <Container>
            <Row>
              <Col lg="6">
                <h1 className="text-center">Search a Stock</h1>
                <Form onSubmit={this.handleLookupStock}>
                  <InputGroup>
                    <Input
                      name="stockInput"
                      type="text"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                  <Button className="mt-md-3" type="submit" block>
                    Look up Stock
                  </Button>
                </Form>
                {stockLoookupError && (
                  <div className="lookup__error">
                    <p>{stockLoookupError}</p>
                  </div>
                )}
                {stock && (
                  <div className="search__result__wrapper">
                    <Card className="search__card">
                      <div className="search__result">
                        <span className="stock__name">
                          <strong>Name: </strong>
                          {stock.name}
                        </span>
                        <span className="stock__ticker">
                          <strong>Symbol: </strong>
                          {stock.ticker}
                        </span>
                        <span className="stock__last__price">
                          <strong>Last Price: </strong>${stock.last_price}
                        </span>
                      </div>
                    </Card>
                    <Button
                      className="mt-4 btn-outline mr-auto ml-auto"
                      onClick={this.handleAddToPortfolio}>
                      Add to portfolio
                    </Button>
                    {addedStock && (
                      <div className="success__message">
                        <p className="text-success">{addedStock.message}</p>
                      </div>
                    )}
                  </div>
                )}
              </Col>
              <Col lg="6">
                <h1 className="text-center">Your Trackings</h1>
                <div className="my__stocks" />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default MyPortfolio;
