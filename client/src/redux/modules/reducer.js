import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import auth from "./auth";
import stock from "./stock";

export default combineReducers({
  form,
  auth,
  stock
});
