import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { renderRoutes } from "react-router-config";
import cookie from "js-cookie";
import routes from "./routes";

import "bootstrap/scss/bootstrap.scss";

/**
 * Redux Store Setup
 */
import ApiClient from "~/helpers/ApiClient";
import configureStore from "~/redux/create";
const apiClient = new ApiClient();
import { load } from "~/redux/modules/auth";

// set initial app state
const initialState = {
  auth: {
    isAuthenticated: cookie.get("token") ? true : false
  }
};

const store = configureStore(initialState, apiClient);

// histroy object
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

async function renderApp() {
  /**
   * if cookie is present then we have a logged in user
   * load the user before rendering the app again.
   * This allows to mount the user in the state of the app
   */
  const { isAuthenticated } = store.getState().auth;
  if (isAuthenticated) {
    await store.dispatch(load());
  }

  render(
    <Provider store={store}>
      <Router history={history}>{renderRoutes(routes)}</Router>
    </Provider>,
    document.querySelector("#react__root")
  );
}

document.addEventListener("DOMContentLoaded", renderApp);
