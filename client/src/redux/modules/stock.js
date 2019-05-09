const LOOK_UP_STOCK = "redux/stock/LOOK_UP_STOCK";
const LOOK_UP_STOCK_SUCCESS = "redux/stock/LOOK_UP_STOCK_SUCCESS";
const LOOK_UP_STOCK_FAIL = "redux/stock/LOOK_UP_STOCK_FAIL";

const ADD_TO_PORTFOLIO = "redux/stock/ADD_TO_PORTFOLIO";
const ADD_TO_PORTFOLIO_SUCCESS = "redux/stock/ADD_TO_PORTFOLIO_SUCCESS";
const ADD_TO_PORTFOLIO_FAIL = "redux/stock/ADD_TO_PORTFOLIO_FAIL";

const initialState = { stockLoaded: false };

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOOK_UP_STOCK:
      return {
        ...state,
        stockLoaded: false
      };
    case LOOK_UP_STOCK_SUCCESS:
      return {
        ...state,
        stockLoaded: true,
        lookedUpStock: action.result,
        stockLoookupError: null
      };
    case LOOK_UP_STOCK_FAIL:
      return {
        ...state,
        stockLoaded: false,
        lookedUpStock: null,
        stockLoookupError: action.error
      };
    case ADD_TO_PORTFOLIO:
      return {
        ...state,
        isAddding: true
      };
    case ADD_TO_PORTFOLIO_SUCCESS:
      return {
        ...state,
        isAddding: false,
        addedStock: action.result,
        error: null
      };
    case ADD_TO_PORTFOLIO_FAIL:
      return {
        ...state,
        isAddding: false,
        addedStock: null,
        error: action.error
      };
    default:
      return state;
  }
}

/*
 * Actions
 * * * * */

/**
 * @param {object} data
 * @param {string} data.stock
 * add stock to portfolio
 */
export function lookUpStock(data) {
  return {
    types: [LOOK_UP_STOCK, LOOK_UP_STOCK_SUCCESS, LOOK_UP_STOCK_FAIL],
    promise: client => client.post("/api/v1/search_stocks", { data })
  };
}

/**
 * @param {object} data
 * @param {string} data.stock_ticker
 * add stock to portfolio
 */
export function addToPortfolio(data) {
  return {
    types: [ADD_TO_PORTFOLIO, ADD_TO_PORTFOLIO_SUCCESS, ADD_TO_PORTFOLIO_FAIL],
    promise: client => client.post("/api/v1/user_stocks", { data })
  };
}
