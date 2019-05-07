import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, Switch, Route } from "react-router";

import Home from "~/components/Home";

/**
 * Redux Store Setup
 */
import ApiClient from "~/helpers/ApiClient";
import configureStore from "~/redux/create";
const apiClient = new ApiClient();

// set initial app state
const initialState = {};

const store = configureStore(initialState, apiClient);

// app core styles
// import "Styles/black-core.scss";

// histroy object
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

async function renderApp() {
  /**
   * if token is present in the cookies then we have a logged in user
   * load the user before rendering the app again. This allows to persist user
   * throw out the app especially on browser refresh
   */
  //   if (token) {
  //     await store.dispatch(loadUser());
  //   }

  render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Provider>,
    document.querySelector("#react__root")
  );
}

document.addEventListener("DOMContentLoaded", renderApp);
